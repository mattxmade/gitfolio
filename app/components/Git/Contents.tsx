"use client";
import React, { Fragment, useState } from "react";

import FileModal from "./FileModal";
import { DirectoryItem } from "@/api/services/github/types";

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

  const handleViewFile = (file: DirectoryItem) => {
    const fileObj = { ...file };

    setCurrentFile(fileObj);
    document.body.style.overflowY = "hidden";

    setViewFile(true);
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

      {/* <h2>{props.name}</h2> */}
      <ul className="repo__content">
        <li className="repo__content__header">
          <p>
            author<span>{" <commit message>"}</span>
          </p>

          <div className="repo-nav-btns">
            <button
              className={
                prevDirectory.length ? "nav-btn--black" : "nav-btn--grey"
              }
              onClick={
                prevDirectory.length
                  ? () => {
                      setCurrDirectory(prevDirectory[prevDirectory.length - 1]);
                      setPrevDirectory((prevDirectory) =>
                        [...new Array(prevDirectory.length - 1)].map(
                          (_val, i) => prevDirectory[i]
                        )
                      );
                    }
                  : () => null
              }
            >
              <i className="fa-solid fa-circle-arrow-left" />
            </button>
          </div>
        </li>

        {currDirectory
          .sort((a, z) => a.type.localeCompare(z.type))
          .map((item, index) => {
            return (
              <Fragment key={item.name + "_" + index}>
                <li className="repo-content__item">
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
                          ? () => handleViewFile(item)
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
                </li>
              </Fragment>
            );
          })}
      </ul>
    </Fragment>
  );
};

export default Contents;
