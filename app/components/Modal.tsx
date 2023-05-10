// Dependencies
import Image from "next/image";
import React, { Fragment } from "react";

// Custom Components
import Icon from "./core/Icon";
import Button from "./widgets/Button";
import NameTag from "./widgets/NameTag";

// Application types
import { IProject } from "../types/application";

type Props = {
  project: IProject;
  chidren?: React.ReactNode;
};

const Modal = ({ project }: Props) => {
  if (!project) return <Fragment />;

  return (
    <div className="modal">
      <Button project={project} className="modal__close-button">
        <i className="fa fa-solid fa-circle-xmark" />
      </Button>

      <h2>+ {project?.title}</h2>

      {/*TODO: add content | array of images*/}
      <ul className="modal__img-list">
        {[...new Array(3)].map((v, i) => (
          <li key={"project-image_" + i}>
            <Image src={project?.img.src} alt="" />
          </li>
        ))}
      </ul>

      <p className="modal__description">{`${project?.description}`}</p>

      <h3>Technologies</h3>

      <ul className="modal__tech-icons-list">
        {project?.tech.map((name, i) => (
          <li key={"project-tech_" + i}>
            <Icon name={name} />
            <NameTag name={name} className="modal__icon-mask" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Modal;
