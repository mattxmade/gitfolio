import { Fragment } from "react";
import DirCommitFragment from "./DirCommitFragment";

const DirectoryElement = (props: DirectoryElementProps) => (
  <Fragment>
    <div style={{ display: "flex" }}>
      <i className="fa fa-solid fa-folder" />
      {props.children}
    </div>

    <DirCommitFragment
      directory={props.directory}
      handleViewFile={props.handleViewFile}
    />
  </Fragment>
);

export default DirectoryElement;

type Div = React.DetailsHTMLAttributes<HTMLDivElement>;
type Children = React.ReactNode;

type HandleViewFile = (
  file: App_SubmoduleItem | App_PatchItem,
  commits: App_CommitItem[] | null
) => void;

type DirectoryElementProps = {
  directory: App_DirectoryItem;
  children?: Children;
  handleViewFile: HandleViewFile;
} & Div;

import {
  App_DirectoryItem,
  App_SubmoduleItem,
  App_CommitItem,
  App_PatchItem,
} from "@/app/api/services/github/types";
