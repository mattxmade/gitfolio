import React, { Fragment } from "react";

// next Components
import Link from "next/link";
import Image from "next/image";

// Custom Components
import Icon from "./core/Icon";
import Button from "./widgets/Button";
import NameTag from "./widgets/NameTag";

// Application Types
import { IProject } from "../types/application";

type Props = { project: IProject };

const Project = ({ project }: React.PropsWithChildren<Props>) => {
  if (!project) return <Fragment />;

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
                <NameTag name={name} className="project-card__icon-mask" />
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
        {/* <Link href={`/projects/${project.title}`}> */}
        <Image
          priority // [1]
          id={`project-card__image-${project.id}`}
          src={project.img.src}
          alt={project.img.alt}
        />
        <Button project={project} className="img-mask">
          <i className="fa fa-solid fa-maximize" />
        </Button>
        {/* </Link> */}
      </div>
    </Fragment>
  );
};

export default Project;

/**
 * -----------------------------------------------------------------------------
 * [1] Priority : Largest Contentful Paint (LCP)
 * -----------------------------------------------------------------------------
 *
 * Issue:
 * Solution: add priority prop to next Image
 *
 * Info: https://nextjs.org/docs/pages/api-reference/components/image#priority
 *
 * =============================================================================
 */
