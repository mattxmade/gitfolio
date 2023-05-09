"use client";
import React, { useContext } from "react";

import { ProjectContext } from "@/app/utils/Contexts";

type Props = {
  project: any;
} & React.HTMLAttributes<HTMLButtonElement>;

// ts 2769
// ServerContext<Context>
// Context<Context>': Provider, Consumer

const Button = (props: Props) => {
  const { project, children, ...defaultProps } = props;

  const ctx = useContext(ProjectContext);
  if (!ctx) return <button>{children}</button>;

  const { setCurrentProject, isModalOpen, setIsModalOpen } = ctx;

  return (
    <button
      {...defaultProps}
      onClick={() => {
        setIsModalOpen(!isModalOpen);
        setCurrentProject(project);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
