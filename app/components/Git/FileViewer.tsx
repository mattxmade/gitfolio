"use client";

import dynamic from "next/dynamic";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
const ReactCodeMirror = dynamic(() => import("@uiw/react-codemirror"));

import {
  App_PatchItem,
  App_SubmoduleItem,
} from "@/app/api/services/github/types";
import getLanguage from "@/app/utils/getLanguage";

type Props = {
  source: App_SubmoduleItem & App_PatchItem;
  children?: React.ReactNode;
};

const FileViewer = ({ source }: Props) => {
  if (!source) return <></>;

  const name = source.type === "file" ? source.name : source.filename;
  const download = source.download ? source.download : source.patch;

  const language = getLanguage(name);

  return (
    <>
      <ReactCodeMirror
        editable={false}
        theme={vscodeDark}
        value={download}
        extensions={language ? [language] : undefined}
      />
    </>
  );
};

export default FileViewer;