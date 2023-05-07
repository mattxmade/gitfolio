import React, { Fragment, useEffect, useState, useRef } from "react";

import Icon from "./core/Icon";
import nameTag from "../ui/nameTag";

const Project = (props) => {
  const project = props.project;

  return (
    <Fragment>
      <aside className="project-card__aside">
        <h2>{project.title}</h2>

        <p className="project-card__description project-card-focus">{`${project.description}`}</p>

        <div className="project-card-focus">
          <h3>Features</h3>
          <ul className="project-card__feature-list">
            {project.features.map((feature, i) => (
              <li key={"project-features_" + i}>
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="project-card__tech">
          <h3>Technologies</h3>

          <ul className="project-card__tech-icons-list">
            {project.tech.map((name, i) => (
              <li key={"project-tech_" + i}>
                <Icon name={name} />
                <div
                  className="project-card__icon-mask"
                  onMouseOver={(e) => nameTag.create(name, e)}
                  onMouseLeave={(e) => nameTag.remove()}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="project-card__icons project-card-focus">
          <a href={project.url.live} target="_blank">
            <i className="fa fa-solid fa-globe" />
          </a>
          <a href={project.url.github} target="_blank">
            <i className="fa fa-brands fa-github" />
          </a>
        </div>
      </aside>

      <div className="project-card__image-container">
        <img
          id={`project-card__image-${project.id}`}
          src={project.img.src}
          alt={project.img.alt}
        />
        <button
          className="img-mask"
          onClick={() => props.handleSelectProject(project)}
          // TODO: aria | image button
        >
          <i className="fa fa-solid fa-maximize" />
        </button>
      </div>
    </Fragment>
  );
};

export default Project;