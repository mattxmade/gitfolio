import React, { Fragment, useEffect, useRef } from "react";

import FileViewer from "./FileViewer";
import { DirectoryItem } from "@/api/services/github/types";

type Dialog = React.DetailedHTMLProps<
  React.DialogHTMLAttributes<HTMLDialogElement>,
  HTMLDialogElement
>;

type Props = {
  file: DirectoryItem;
  children?: React.ReactNode;
} & Dialog;

const styles = {
  header: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
};

const FileModal = ({ file, children, open, ...props }: Props) => {
  if (file.type === "dir" || file.type === "symlink") return <Fragment />;

  const REF_FileModal = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    open && REF_FileModal.current
      ? REF_FileModal.current?.showModal()
      : REF_FileModal.current?.close();
  }, [open]);

  return (
    <dialog ref={REF_FileModal} {...props}>
      <div className="modal--repo-file__overlay">
        <div className="modal--repo-file__header" style={styles.header}>
          <h2>{file ? file.name || file.filename : ""}</h2>
          <div style={{ display: "flex" }}>{children}</div>
        </div>

        <FileViewer file={file} />
      </div>
    </dialog>
  );
};

export default FileModal;
