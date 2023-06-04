// server component

// Dependencies
import React, { Fragment } from "react";

// Custom Components
import Project from "./Project";

// Application Types
import { IProject } from "../types/application";

type Props = {
  id: string;
  heading: string;
  projects: Array<IProject>;
};

const Group = (props: React.PropsWithChildren<Props>) => {
  return (
    <Fragment>
      <h2 id={props.id}>
        <a href={`#${props.id}`}>{props.heading}</a>
      </h2>

      <ul className="projects">
        {props.projects.map((project, index) => (
          <li key={index} id={project?.id} className="project-card">
            <Project project={project} index={index} />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Group;
