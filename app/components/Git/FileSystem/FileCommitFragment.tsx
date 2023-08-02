import React, { Fragment } from "react";
import { processCommitDate } from "@/app/utils/processCommits";

const FileCommitFragment = ({ file, handleViewFile }: FileCommitProps) => {
  if (!file.commits) return <Fragment />;

  return (
    <Fragment>
      <p
        className="repo-item--hover repo-item__commit-message"
        onClick={() => {
          file.commits[0].file
            ? handleViewFile(file.commits[0].file, file.commits)
            : handleViewFile(file, null);
        }}
      >
        {file.commits[0]?.message}
      </p>
      <p>{processCommitDate(file.commits[0]?.author.date)}</p>
    </Fragment>
  );
};

export default FileCommitFragment;

import {
  App_PatchItem,
  App_CommitItem,
  App_SubmoduleItem,
} from "@/app/api/services/github/types";

type HandleViewFile = (
  file: App_SubmoduleItem | App_PatchItem,
  commits: App_CommitItem[] | null
) => void;

type FileCommitProps = {
  file: App_SubmoduleItem;
  children?: React.ReactNode;
  handleViewFile: HandleViewFile;
};
