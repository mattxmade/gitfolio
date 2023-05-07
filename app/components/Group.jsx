import React, { Fragment } from "react";

import Project from "./Project";

const Group = (props) => {
  return (
    <Fragment>
      <h2 id={props.id}>
        <a href={`#${props.id}`}>{props.heading}</a>
      </h2>

      <ul className="projects">
        {props.projects.map((project, index) => (
          <li key={index} className="project-card">
            <Project
              project={project}
              repo={props.projectsData}
              handleSelectProject={props.handleSelectProject}
            />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Group;
