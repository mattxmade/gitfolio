"use client";
import React, { Fragment, useState } from "react";

import {
  DirectoryItem,
  App_PatchItem,
  App_CommitItem,
  App_SubmoduleItem,
  App_DirectoryItem,
} from "@/app/api/services/github/types";

import { getLastCommit } from "@/app/utils/processCommits";

import DirectoryElement from "./FileSystem/DirectoryItem";
import ContentsHeader from "./FileSystem/ContentsHeader";
import FileElement from "./FileSystem/FileItem";
import FileHistory from "./FileHistory";
import FileModal from "./FileModal";

type Props = {
  id: string;
  contents: DirectoryItem[];
  children?: React.ReactNode;
};

type IContentsIndex = Array<DirectoryItem[] | []>;

const Contents = ({ contents, ...props }: Props) => {
  const [currDirectory, setCurrDirectory] = useState<DirectoryItem[]>(contents);
  const [traversedDirs, setTraversedDirs] = useState<IContentsIndex>([]);

  const [currentFile, setCurrentFile] = useState<
    App_SubmoduleItem | App_PatchItem | null
  >(null);

  const [commitHistory, setCommitHistory] = useState<Array<any> | []>([]);

  const handleViewFile = (
    file: App_PatchItem | App_SubmoduleItem,
    commits: App_CommitItem[] | null
  ) => {
    const fileObj = { ...file };

    setCurrentFile(fileObj);
    if (commits) setCommitHistory(commits);
    document.body.style.overflowY = "hidden";

    setViewFile(true);
  };

  const closeFileViewer = () => {
    document.body.style.overflowY = "initial";

    setViewFile(false);
    setCurrentFile(null);
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
    <>
      {currentFile ? (
        <FileModal
          open={viewFile}
          source={currentFile as unknown as App_SubmoduleItem & App_PatchItem}
          className="modal--repo-file"
          closeFileViewer={closeFileViewer}
        >
          {commitHistory ? (
            <FileHistory
              commits={commitHistory}
              handleViewFile={handleViewFile}
            />
          ) : null}
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
    </>
  );
};

export default Contents;
