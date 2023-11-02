import { Fragment } from "react";
import { getLatestCommit, processCommitDate } from "@/app/utils/processCommits";

const DirCommitFragment = ({ directory, handleViewFile }: DirCommitProps) => {
  const submodule = directory.contents?.find(
    (item) => item.type === "file" || item.type === "submodule"
  ) as App_SubmoduleItem | null;

  const mostRecentCommit = getLatestCommit(
    directory.contents as DirectoryContents,
    []
  );
  const latestCommitDate = mostRecentCommit?.author.date.slice(0, 10);

  return (
    <Fragment>
      <p
        className="repo-item--hover repo-item__commit-message"
        onClick={() =>
          mostRecentCommit?.files
            ? handleViewFile(mostRecentCommit.files[0], null)
            : submodule && handleViewFile(submodule, null)
        }
      >
        {mostRecentCommit?.message}
      </p>
      {latestCommitDate ? <p>{processCommitDate(latestCommitDate)}</p> : null}
    </Fragment>
  );
};

export default DirCommitFragment;

import {
  App_CommitItem,
  App_SubmoduleItem,
  App_DirectoryItem,
  App_PatchItem,
  DirectoryContents,
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
