import React, { useEffect, useState, useRef, Fragment } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import getLanguage from "@/app/utils/getLanguage";
import { DirectoryItem } from "@/api/services/github/types";

type Props = {
  file: DirectoryItem;
  children?: React.ReactNode;
};

const FileViewer = ({ file, children }: Props) => {
  if (!file) return <Fragment />;

  return (
    <CodeMirror
      editable={false}
      theme={vscodeDark}
      value={file.download}
      extensions={[getLanguage(file.name)]}
    />
  );
};

export default FileViewer;
