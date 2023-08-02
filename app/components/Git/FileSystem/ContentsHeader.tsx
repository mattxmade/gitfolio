import React, { Fragment } from "react";

const ContentsHeader = (props: ContentsHeaderProps) => {
  const { traversedDirs, moveToPrevDirectory } = props;

  return (
    <Fragment>
      <p>
        <strong>{props.lastCommit?.author.name} </strong>
        <span>{props.lastCommit?.message}</span>
      </p>

      <div className="repo-nav-btns">
        <button
          className={traversedDirs.length ? "nav-btn--black" : "nav-btn--grey"}
          onClick={traversedDirs.length ? moveToPrevDirectory : () => null}
        >
          <i className="fa-solid fa-circle-arrow-left" />
        </button>
      </div>
    </Fragment>
  );
};

export default ContentsHeader;

import { App_CommitItem, DirectoryItem } from "@/app/api/services/github/types";

type IContentsIndex = Array<DirectoryItem[] | []>;

type ContentsHeaderProps = {
  children?: React.ReactNode;
  lastCommit?: App_CommitItem | undefined;
  traversedDirs: IContentsIndex;
  moveToPrevDirectory: () => void;
};
