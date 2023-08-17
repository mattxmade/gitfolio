import React, { Fragment } from "react";

type Props = {
  name: string;
  children?: React.ReactNode;
};

import Svg from "./Svg";
const { WebpackIcon } = Svg;

const Icon = (props: Props) => {
  switch (props.name) {
    case "HTML":
      return <i className="tech-icon fa-brands fa-html5" />;
    case "CSS":
      return <i className="tech-icon fa-brands fa-css3-alt" />;
    case "Git":
      return <i className="fa-brands fa-git" />;
    case "JavaScript":
      return <i className="tech-icon fa-brands fa-square-js" />;
    case "Laravel":
      return <i className="fa-brands fa-laravel" />;
    case "Node":
      return <i className="fa-brands fa-node" />;
    case "NPM":
      return <i className="fa-brands fa-npm" />;
    case "PHP":
      return <i className="fa-brands fa-php" />;
    case "React":
      return <i className="tech-icon fa-brands fa-react" />;
    case "Sass":
      return <i className="fa-brands fa-sass" />;
    case "ThreeJS":
      return <i className="tech-icon fa-solid fa-cube" />;
    case "Webpack":
      return (
        <i className="tech-icon fa-brands fa-webpack">
          <WebpackIcon />
        </i>
      );
    default:
      return <Fragment />;
  }
};

export default Icon;
