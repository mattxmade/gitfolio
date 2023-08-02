// server component
import "server-only";

import { Fragment, Suspense } from "react";
import Image from "next/image";

// Custom Components
import Icon from "./core/Icon";
import Button from "./widgets/Button";
import NameTag from "./widgets/NameTag";
import FolderBtn from "./Git/FolderBtn";

import DivMask from "./transitions/elementLibrary";
import LoadingSpinner from "./widgets/LoadingSpinner";

// Application Types
import { IProject } from "../types/application";
import Repository from "./Git/Repository";

type ProjectProps = {
  index: number;
  children?: React.ReactNode;
  project: IProject;
};

const Project = ({ project, ...props }: ProjectProps) => {
  if (!project) return <Fragment />;

  return (
    <Fragment>
      <div id={`${project.id}-repo-drawer`} className="repo-drawer">
        <Suspense key={project.id}>
          <Repository
            id={project.id}
            repoName={project.repo}
            requireCommits={true}
          />
        </Suspense>
      </div>

      <aside className="project-card__aside">
        <DivMask offset={props.index + 1} delay={200}>
          <h2>{project.title}</h2>
        </DivMask>

        <DivMask offset={props.index + 1} delay={200}>
          <p className="project-card__description project-card-focus">{`${project.description}`}</p>
        </DivMask>

        <DivMask offset={props.index + 1} delay={200}>
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
        </DivMask>
        {props.children}

        <DivMask offset={props.index + 1} delay={200}>
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
        </DivMask>

        <div className="project-card__icons project-card-focus">
          <a
            href={project.url.live || "#"}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} live link`}
          >
            <i className="fa fa-solid fa-globe" />
          </a>
          <a
            href={project.url.github || "#"}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} git repo link`}
          >
            <i className="fa fa-brands fa-github" />
          </a>
          <LoadingSpinner>
            <FolderBtn id={project.id} />
          </LoadingSpinner>
        </div>
      </aside>

      <div className={"project-card__image-container"}>
        <DivMask offset={props.index + 1} delay={200}>
          <Image
            priority // [1]
            id={`project-card__image-${project.id}`}
            src={project.img.src}
            alt={project.img.alt}
          />
        </DivMask>
        {/* <Button project={project} className="img-mask">
          <i className="fa fa-solid fa-maximize" />
        </Button> */}
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
 * =============================================================================
 
 * -----------------------------------------------------------------------------
 * [2] Async Component : Incorrect Type error
 * -----------------------------------------------------------------------------
 *
 * Issue:
 * TypeScript throws error for any async JSX component
 *
 * Workaround: add @ts-expect-error
 * Info: https://youtu.be/sr8bwLXDm3U?t=88
 *
 * Fixed in TypeScript 5.1+
 * =============================================================================
 */
