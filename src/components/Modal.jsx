import React from "react";

import Icon from "./core/Icon";
import nameTag from "../ui/nameTag";

const Modal = ({ project, handleDialogVisibility }) => {
  return (
    <div className="modal">
      <button
        className="modal__close-button"
        onClick={() => handleDialogVisibility("close")}
      >
        <i className="fa fa-solid fa-circle-xmark" />
      </button>

      <h2>+ {project?.title}</h2>

      {/*TODO: add content | array of images*/}
      <ul className="modal__img-list">
        {[...new Array(3)].map((v, i) => (
          <li key={"project-image_" + i}>
            <img src={project?.img.src} alt="" />
          </li>
        ))}
      </ul>

      <p className="modal__description">{`${project?.description}`}</p>

      <h3>Technologies</h3>

      <ul className="modal__tech-icons-list">
        {project?.tech.map((name, i) => (
          <li key={"project-tech_" + i}>
            <Icon name={name} />
            <div
              className="modal__icon-mask"
              onMouseOver={(e) => nameTag.create(name, e)}
              onMouseLeave={(e) => nameTag.remove()}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Modal;
