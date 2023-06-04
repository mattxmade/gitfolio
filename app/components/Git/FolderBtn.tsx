"use client";

import { MouseEvent, useState } from "react";

import useAppContext from "../hooks/useAppContext";

type Props = {
  id: string;
  children?: React.ReactNode;
};

const FolderBtn = (props: Props) => {
  const ctx = useAppContext("folder-context");
  const [pressed, setIsPressed] = useState<boolean | null>(null);

  const handleButtonPress = (e: MouseEvent<HTMLElement> | null) => {
    const repoFolder = document.getElementById("repo-folder-" + props.id);

    if (!repoFolder) return;

    repoFolder && repoFolder.classList.toggle("show-folder");

    ctx?.updateCurrentProjects("repo-folder-" + props.id, "ui", !pressed);
    setIsPressed(!pressed);
  };

  return (
    <button
      id={"folder-btn-" + props.id}
      type="submit"
      style={{ width: "31.5px" }}
      onClick={handleButtonPress}
    >
      {props.children ? (
        props.children
      ) : (
        <i
          style={{ color: "lightblue" }}
          className={`fa fa-solid ${!pressed ? "fa-folder" : "fa-folder-open"}`}
        />
      )}
    </button>
  );
};
export default FolderBtn;
