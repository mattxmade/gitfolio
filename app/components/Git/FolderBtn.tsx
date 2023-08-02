"use client";

import { MouseEvent, useState } from "react";

type Props = {
  id: string;
  children?: React.ReactNode;
};

const FolderBtn = (props: Props) => {
  const [pressed, setIsPressed] = useState<boolean | null>(null);

  const handleButtonPress = (e: MouseEvent<HTMLElement>) => {
    const repoFolder = document.getElementById("repo-folder-" + props.id);

    if (!repoFolder) return;

    repoFolder && repoFolder.classList.toggle("show-folder");
    setIsPressed(!pressed);
  };

  return (
    <button
      id={"folder-btn-" + props.id}
      type="submit"
      style={{ width: "31.5px" }}
      onClick={handleButtonPress}
      aria-label={`${props.id} folder button`}
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
