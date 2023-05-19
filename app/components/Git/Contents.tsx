"use client";
import React, { Fragment, useState } from "react";

import {
  DirectoryItem,
  App_CommitItem,
  App_SubmoduleItem,
  App_DirectoryItem,
} from "@/api/services/github/types";

import FileModal from "./FileModal";
import ContentsHeader from "./FileSystem/ContentsHeader";
import DirCommitFragment from "./FileSystem/DirCommitFragment";
import FileCommitFragment from "./FileSystem/FileCommitFragment";

import { getLastCommit } from "@/app/utils/processCommits";

type Props = {
  name: string;
  contents: DirectoryItem[];
  children?: React.ReactNode;
};

type IContentsIndex = Array<DirectoryItem[] | []>;

const Contents = ({ contents, ...props }: Props) => {
  const [currDirectory, setCurrDirectory] = useState<DirectoryItem[]>(contents);
  const [prevDirectory, setPrevDirectory] = useState<IContentsIndex>([]);

  const [currentFile, setCurrentFile] = useState<DirectoryItem | null>(null);
  const [commitHistory, setCommitHistory] = useState([]);

  const handleViewFile = (
    file: DirectoryItem,
    commits: App_CommitItem[] | null
  ) => {
    const fileObj = { ...file };

    setCurrentFile(fileObj);
    document.body.style.overflowY = "hidden";

    setViewFile(true);
  };

  // Only called if currently in a subdirectory
  const handleRepoLevel = () => {
    // Navigate up one level to previous directory
    setCurrDirectory(prevDirectory[prevDirectory.length - 1]);

    // currDir becomes prevDir and added to list
    // Array length dependent on the number of levels a directory has
    setPrevDirectory((prevDirectory) =>
      [...new Array(prevDirectory.length - 1)].map(
        (_val, i) => prevDirectory[i]
      )
    );
  };

  const [viewFile, setViewFile] = useState<boolean>(false);

  return (
    <Fragment>
      {currentFile ? (
        <FileModal
          open={viewFile}
          file={currentFile}
          className="modal--repo-file"
        >
          <Fragment>
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
          </Fragment>
        </FileModal>
      ) : null}

      <ul className="repo__content">
        <li className="repo__content__header">
          <ContentsHeader
            lastCommit={getLastCommit(currDirectory)}
            prevDirectory={prevDirectory}
            handleRepoLevel={handleRepoLevel}
          />
        </li>

        {currDirectory
          .sort((a, z) => a.type.localeCompare(z.type))
          .map((item, index) => {
            return (
              <li key={item.name + "_" + index} className="repo-content__item">
                <div style={{ display: "flex" }}>
                  <i
                    className={
                      item.type === "dir"
                        ? "fa fa-solid fa-folder"
                        : "fa fa-regular fa-file"
                    }
                  />

                  <p
                    className="repo-item--hover repo-item__item-name"
                    onClick={
                      item.type === "file"
                        ? () => handleViewFile(item, null)
                        : () => {
                            setPrevDirectory((prevDir) => [
                              ...prevDir,
                              currDirectory,
                            ]);
                            setCurrDirectory(item.contents);
                          }
                    }
                  >
                    {item?.name}
                  </p>
                </div>

                {item.type === "file" ? (
                  <FileCommitFragment
                    file={item as unknown as App_SubmoduleItem}
                    handleViewFile={handleViewFile}
                  />
                ) : item.type === "dir" ? (
                  <DirCommitFragment
                    directory={item as unknown as App_DirectoryItem}
                    handleViewFile={handleViewFile}
                  />
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
