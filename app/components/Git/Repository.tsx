import "server only";

import React from "react";
import Contents from "./Contents";

import github from "@/api/services/github/github";
import { IRepository, IGitResponse } from "@/app/types/application";

type Props = {
  repoName: string;
  children?: React.ReactNode;
};

const { handleRepoContentRequest } = github;

const Repository = async (props: Props) => {
  const request = (await handleRepoContentRequest(props.repoName)) as Response;
  const response = (await request.json()) as IGitResponse;

  const gitRepo = response.data as IRepository;

  return (
    <div
      style={{
        top: "11rem",
        width: "100%",
        height: "calc(100% - 11rem)",
        position: "absolute",
        overflow: "hidden",
        padding: "0.5rem 0 0",
      }}
    >
      <div
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
        <Contents name={gitRepo.name} contents={gitRepo.contents} />
      </div>
    </div>
  );
};

export default Repository;
