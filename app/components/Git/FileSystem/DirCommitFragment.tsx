import { Fragment } from "react";
import { processCommitDate } from "@/app/utils/processCommits";

const DirCommitFragment = ({ directory, handleViewFile }: DirCommitProps) => {
  const submodule = directory.contents?.find(
    (item) => item.type === "file" || item.type === "submodule"
  ) as App_SubmoduleItem | null;

  if (!submodule) return <p>Empty Directory</p>;

  const mostRecentCommit = submodule.commits && submodule.commits[0];

  return (
    <Fragment>
      <p
        className="repo-item--hover repo-item__commit-message"
        onClick={() =>
          mostRecentCommit.file
            ? handleViewFile(mostRecentCommit.file, null)
            : handleViewFile(submodule, null)
        }
      >
        {mostRecentCommit?.message}
      </p>
      <p>{processCommitDate(mostRecentCommit?.author?.date.slice(0, 10))}</p>
    </Fragment>
  );
};

export default DirCommitFragment;

import {
  App_CommitItem,
  App_SubmoduleItem,
  App_DirectoryItem,
  App_PatchItem,
} from "@/app/api/services/github/types";

type HandleViewFile = (
  file: App_SubmoduleItem | App_PatchItem,
  commits: App_CommitItem[] | null
) => void;

type DirCommitProps = {
  directory: App_DirectoryItem;
  children?: React.ReactNode;
  handleViewFile: HandleViewFile;
};
