import React, { Fragment, useEffect, useRef, useState } from "react";

import FileViewer from "./FileViewer";

import {
  App_PatchItem,
  App_SubmoduleItem,
} from "@/app/api/services/github/types";

const editPatch = (patch: string) =>
  patch.slice(patch.length - 25) === "No newline at end of file"
    ? patch.slice(0, patch.length - 27)
    : patch;

// App_PatchItem should be App_CommitItem
const commitFactory = (commit: App_PatchItem) => {
  let patch = editPatch(commit.patch);
  let title: string | undefined;

  // Patch changes format: @@ -0,0 +1 @@
  const onlyAtAts: Array<{ inserts: string; index: number }> = []; //

  patch.split("").map((char, i) => {
    if (onlyAtAts.length === 4) return;
    if (char === "@") onlyAtAts.push({ inserts: char, index: i });
  });

  if (onlyAtAts.length) {
    const insertStart = onlyAtAts[0].index; // >@@ ... @@
    const insertEnd = onlyAtAts[3].index; //..  @@ ... @@<

    // Patch Title @@ ... @@ | get inserts also
    title = patch.slice(insertStart, insertEnd + 1);

    // Remove patch insert @@ ... @@ | only want code
    commit.patch = patch.slice(insertEnd + 2);
  } else commit.patch = patch;

  // additions | deletions
  const adds: Array<{ line: string; index: number }> = [];
  const dels: Array<{ line: string; index: number }> = [];

  const newLine = new RegExp("\n");

  // single changes array | changes.line.index : changes.line.decoration
  patch
    .split(newLine)
    .map((line, i) =>
      line.startsWith("+") ? adds.push({ line, index: i }) : null
    );
  patch
    .split(newLine)
    .map((line, i) =>
      line.startsWith("-") ? dels.push({ line, index: i }) : null
    );

  console.log("Additions: " + adds.length);
  console.log("Deletions: " + dels.length);

  return { title, adds, dels };
};

type Modified_CommitItem = {
  commit: App_PatchItem;
  title: string | undefined;
  adds: Array<{ inserts: string; index: number }> | [];
  dels: Array<{ inserts: string; index: number }> | [];
};

type Dialog = React.DetailedHTMLProps<
  React.DialogHTMLAttributes<HTMLDialogElement>,
  HTMLDialogElement
>;

type Props = {
  source: App_SubmoduleItem & App_PatchItem;
  children?: React.ReactNode;
  closeFileViewer: () => void;
} & Dialog;

const styles = {
  header: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
};

type FileSource = App_SubmoduleItem & App_PatchItem;

const FileModal = ({
  open,
  source,
  children,
  closeFileViewer,
  ...props
}: Props) => {
  const REF_FileModal = useRef<HTMLDialogElement | null>(null);

  const file =
    source.type === "file" ? ({ ...source } as App_SubmoduleItem) : null;

  // FIX TYPES
  // Incorrect type App_PatchItem => App_CommitItem
  const commit =
    source.type === "patch"
      ? { ...source, ...commitFactory({ ...source }) }
      : null;

  const filename = (file && file.name) || (commit && commit.filename);

  const cmon = commit ? { ...source } : null;
  if (cmon) cmon.patch = editPatch(cmon?.patch);

  const codeFile = (file && file) || (commit && cmon);

  // handleViewFile

  useEffect(() => {
    open && REF_FileModal.current
      ? REF_FileModal.current?.showModal()
      : REF_FileModal.current?.close();
  }, [open]);

  return (
    <dialog ref={REF_FileModal} {...props}>
      <div className="modal--repo-file__overlay">
        <div className="modal--repo-file__header" style={styles.header}>
          {filename ? <h2>{filename}</h2> : null}

          <div style={{ display: "flex" }}>
            {commit ? (
              <button
                className="code-view__history-btn"
                style={{
                  gap: "1rem",
                  display: "flex",
                  alignItems: "center",
                  margin: "1rem 2rem 1rem 1rem",
                  position: "relative",
                  zIndex: 2,
                }}
                onClick={() => {
                  document
                    .querySelector(".code-view__aside")
                    ?.classList.toggle("hide");
                }}
              >
                <i className="fa fa-solid fa-clock-rotate-left" />{" "}
                <p>history</p>
              </button>
            ) : null}

            <button
              className="modal__close-button"
              style={{
                color: "whitesmoke",
                position: "relative",
                zIndex: 2,
              }}
              onClick={closeFileViewer}
            >
              <i className="fa fa-solid fa-circle-xmark" />
            </button>
          </div>
        </div>
      </div>

      {source ? <FileViewer source={codeFile as FileSource} /> : null}
      {children}
    </dialog>
  );
};

export default FileModal;
