import React, { Fragment, useState } from "react";
import {
  IPatchItem,
  ICommitItem,
  App_PatchItem,
  App_CommitItem,
  App_SubmoduleItem,
} from "@/app/api/services/github/types";

import { sortCommitsByDate } from "@/app/utils/processCommits";

type HandleViewFile = (
  file: App_SubmoduleItem | App_PatchItem,
  commits: App_CommitItem[] | null
) => void;

type Props = {
  commits: Array<App_CommitItem>;
  children?: React.ReactNode;
  handleViewFile: HandleViewFile;
};

const FileHistory = ({ commits, children, handleViewFile }: Props) => {
  const commitHistory = sortCommitsByDate(commits);

  return (
    <Fragment>
      <aside
        className={"code-view__aside hide"}
        style={{ position: "absolute" }}
      >
        {commitHistory.map((history, index) => {
          return (
            <ul key={history.date + "_" + index}>
              <li className="commit-start commit-divider">
                <p>
                  <span>
                    <i className="fa fa-solid fa-code-commit" />
                  </span>
                  {`Commits on ${history.date}`}
                </p>
              </li>

              {history.commits.byDate.map((commit, i) => (
                <li key={commit.sha}>
                  <div className="code-view__aside__content">
                    <h4
                      onClick={
                        history.commits.all.length > 1
                          ? () => {
                              handleViewFile(commit.file, history.commits.all);
                            }
                          : () => null
                      }
                    >
                      {commit.message}
                    </h4>
                    <p>{`${commit.author.name} commited on ${history.date}`}</p>
                    <div className="commit-stem"></div>
                  </div>
                </li>
              ))}
              <li className="commit-end commit-divider">
                <p>
                  <span>
                    <i className="fa fa-solid fa-code-commit" />
                  </span>
                  End of commit history for this file
                </p>
              </li>
            </ul>
          );
        })}
      </aside>
    </Fragment>
  );
};

export default FileHistory;
