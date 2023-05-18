import React, { Fragment, useState } from "react";
import { App_CommitItem, ICommitItem } from "@/api/services/github/types";

type Props = {
  commits: Array<ICommitItem | App_CommitItem>;
  children?: React.ReactNode;
};

const FileHistory = ({ commits, children }: Props) => {
  return (
    <aside style={{ position: "absolute" }}>
      {commits.map((item, index) => {
        return <Fragment />;
      })}
    </aside>
  );
};

export default FileHistory;
