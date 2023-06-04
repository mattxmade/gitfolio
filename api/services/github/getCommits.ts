import "server-only";

import { ownerConfig, headers, octokit } from "./ownerConfig";
import {
  CommitItem,
  ICommitItem,
  IPatchItem,
  App_PatchItem,
  App_CommitItem,
} from "./types";

const commitWithProps = (item: ICommitItem): App_CommitItem => {
  return {
    author: {
      name: item.commit?.author?.name ? (ownerConfig.owner as string) : "",
      date: item.commit?.author?.date ?? "",
    },
    message: item.commit?.message ?? "",
    sha: item.sha ?? "",
    file: {} as App_PatchItem,
    type: "commit",
  };
};

type RequestOptions = {
  repo: string;
  path: string | undefined;
  sha?: string | undefined;
  owner: string;
};

const getCommits = async (request: RequestOptions) => {
  try {
    const commitsList = await octokit.rest.repos.listCommits({
      page: 1,
      per_page: 30,
      repo: request.repo,
      owner: request.owner,
      author: request.owner,
      sha: request.sha ? request.sha : "",
      path: request.path ? request.path : "",
      accept: "application/json",
    });

    const fileCommits = await Promise.all(
      [...new Array(commitsList.data.length)].map(
        async (commit: App_CommitItem, i) => {
          const check = { ...commit } as unknown as CommitItem;
          if (check.files) check.files.forEach((file) => console.log(file));

          commit = commitWithProps(commitsList.data[i]);

          const patches = await octokit.rest.repos.getCommit({
            headers,
            repo: request.repo,
            ref: commitsList.data[i].sha,
            owner: request.owner as string,
          });

          if (patches.data.files?.length) {
            commit.file = patches.data.files.filter(
              (patch: Partial<IPatchItem>) => {
                // Omit unneeded properties
                delete patch?.raw_url;
                delete patch?.blob_url;
                delete patch?.contents_url;

                // Add type
                patch.type = "patch";

                // Filter by pathname
                return patch?.filename === request.path ? patch : undefined;
              }
            )[0] as App_PatchItem;
          }
          return commit;
        }
      )
    );
    return fileCommits ?? [];
  } catch (error) {
    console.log("Fetching commits failed " + error);
    return [];
  }
};

export default getCommits;
