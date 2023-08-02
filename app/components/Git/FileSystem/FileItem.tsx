import { Fragment } from "react";
import FileCommitFragment from "./FileCommitFragment";

const FileElement = (props: FileElementProps) => (
  <Fragment>
    <div style={{ display: "flex" }}>
      <i className="fa fa-regular fa-file" />
      <p
        className="repo-item--hover repo-item__item-name"
        onClick={() => props.handleViewFile(props.file, null)}
      >
        {props.file?.name}
      </p>
    </div>

    <FileCommitFragment
      file={props.file}
      handleViewFile={props.handleViewFile}
    />
  </Fragment>
);

export default FileElement;

import {
  App_SubmoduleItem,
  App_CommitItem,
  App_PatchItem,
} from "@/app/api/services/github/types";

type Children = React.ReactNode;

type HandleViewFile = (
  file: App_SubmoduleItem | App_PatchItem,
  commits: App_CommitItem[] | null
) => void;

type FileElementProps = {
  file: App_SubmoduleItem;
  children?: Children;
  handleViewFile: HandleViewFile;
};
