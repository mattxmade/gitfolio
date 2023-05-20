"use client";
import React, { Fragment, useState } from "react";

import {
  DirectoryItem,
  App_PatchItem,
  App_CommitItem,
  App_SubmoduleItem,
  App_DirectoryItem,
} from "@/api/services/github/types";

import FileModal from "./FileModal";
import ContentsHeader from "./FileSystem/ContentsHeader";
import FileElement from "./FileSystem/FileItem";
import DirectoryElement from "./FileSystem/DirectoryItem";

import { getLastCommit } from "@/app/utils/processCommits";

type Props = {
  name: string;
  contents: DirectoryItem[];
  children?: React.ReactNode;
};

type IContentsIndex = Array<DirectoryItem[] | []>;

const Contents = ({ contents, ...props }: Props) => {
  const [currDirectory, setCurrDirectory] = useState<DirectoryItem[]>(contents);
  const [traversedDirs, setTraversedDirs] = useState<IContentsIndex>([]);
  // const [traversedDirs, setTraversedDirs] = useState<IContentsIndex>([]);

  const [currentFile, setCurrentFile] = useState<
    App_SubmoduleItem | App_PatchItem | null
  >(null);

  const [commitHistory, setCommitHistory] = useState([]);

  const handleViewFile = (
    file: App_PatchItem | App_SubmoduleItem,
    commits: App_CommitItem[] | null | any
  ) => {
    const fileObj = { ...file };

    setCurrentFile(fileObj);
    document.body.style.overflowY = "hidden";

    setViewFile(true);
  };

  const moveToNextDirectory = (subdirectory: any) => {
    setTraversedDirs((prevDir) => [...prevDir, currDirectory]);
    setCurrDirectory(subdirectory);
  };

  // Only callable if currently in a subdirectory
  const moveToPrevDirectory = () => {
    setCurrDirectory(traversedDirs[traversedDirs.length - 1]);

    // Array of traversed directories minus the current directory we want to move from
    setTraversedDirs((currentTraversedDirectories) =>
      [...new Array(currentTraversedDirectories.length - 1)].map(
        (_val, i) => currentTraversedDirectories[i]
      )
    );
  };

  const [viewFile, setViewFile] = useState<boolean>(false);

  return (
    <Fragment>
      {currentFile ? (
        <FileModal
          open={viewFile}
          source={currentFile as unknown as App_SubmoduleItem & App_PatchItem}
          className="modal--repo-file"
        >
          <button
            className="modal__close-button"
            style={{
              color: "whitesmoke",
              position: "relative",
              zIndex: 2,
            }}
            onClick={() => {
              document.body.style.overflowY = "initial";

              setViewFile(false);
              setCurrentFile(null);
            }}
          >
            <i className="fa fa-solid fa-circle-xmark" />
          </button>
        </FileModal>
      ) : null}

      <ul className="repo__content">
        <li className="repo__content__header">
          <ContentsHeader
            lastCommit={getLastCommit(contents)}
            traversedDirs={traversedDirs}
            moveToPrevDirectory={moveToPrevDirectory}
          />
        </li>

        {currDirectory
          .sort((a, z) => a.type.localeCompare(z.type))
          .map((item, index) => {
            return (
              <li key={item.name + "_" + index} className="repo-content__item">
                {item.type === "file" ? (
                  <FileElement
                    file={item as unknown as App_SubmoduleItem}
                    handleViewFile={handleViewFile}
                  />
                ) : item.type === "dir" ? (
                  <DirectoryElement
                    directory={item as unknown as App_DirectoryItem}
                    handleViewFile={handleViewFile}
                  >
                    <p
                      className="repo-item--hover repo-item__item-name"
                      onClick={() => moveToNextDirectory(item.contents)}
                    >
                      {item?.name}
                    </p>
                  </DirectoryElement>
                ) : (
                  <Fragment />
                )}
              </li>
            );
          })}
      </ul>
    </Fragment>
  );
};

export default Contents;
