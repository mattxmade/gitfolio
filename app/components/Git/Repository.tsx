import "server-only";
import dynamic from "next/dynamic";

const Contents = dynamic(() => import("./Contents"));

import github from "@/api/services/github/github";
import { IRepository, IGitResponse } from "@/app/types/application";

type Props = {
  id: string;
  repoName: string;
  requireCommits: boolean;
  children?: React.ReactNode;
};

const { handleRepoContentRequest } = github;

const Repository = async ({ id, repoName, requireCommits }: Props) => {
  const request = (await handleRepoContentRequest(
    repoName,
    requireCommits
  )) as Response;
  const response = (await request.json()) as IGitResponse;

  const gitRepo = response.data as IRepository;

  return (
    <div
      id={"repo-folder-" + id}
      className="repo-folder"
      style={{
        zIndex: 1,
        height: "100%",
        position: "absolute",
        backgroundColor: "darkslategrey",
        borderRadius: "0.2rem",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: "0 0 0.5rem 0.1rem darkslategrey",
        overflowY: "scroll",
      }}
    >
      <Contents id={id} contents={gitRepo.contents} />
    </div>
  );
};

export default Repository;
