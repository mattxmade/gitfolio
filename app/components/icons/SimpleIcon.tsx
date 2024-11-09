import React, { CSSProperties, Fragment } from "react";

type Props = {
  name: string;
  color?: boolean;
  children?: React.ReactNode;
} & JSX.IntrinsicElements["i"];

import Svg from "../core/Svg";
const { WebpackIcon } = Svg;

const SimpleIcon = ({ name, color, children, ...props }: Props) => {
  const layout = {
    display: "flex",
    justifyContent: "center",
  } as CSSProperties;

  switch (name) {
    case "CSS":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-css3-alt"
          style={{ ...layout }}
        >
          <Svg.CSS3 />
        </i>
      );
    case "HTML":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-html5"
          style={{ ...layout }}
        >
          <Svg.HTML5 />
        </i>
      );
    case "Jest":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-jest"
          style={{ ...layout }}
        >
          <Svg.Jest />
        </i>
      );
    case "JavaScript":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-square-js"
          style={{ ...layout }}
        >
          <Svg.JavaScript />
        </i>
      );
    case "Next":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-nextjs"
          style={{ ...layout }}
        >
          <Svg.Next />
        </i>
      );

    case "Node":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-node"
          style={{ ...layout }}
        >
          <Svg.Node />
        </i>
      );

    case "NPM":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-npm"
          style={{ ...layout }}
        >
          <Svg.NPM />
        </i>
      );
    case "React":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-react"
          style={{ ...layout }}
        >
          <Svg.React />
        </i>
      );
    case "ReactRouter":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-reactrouter"
          style={{ ...layout }}
        >
          <Svg.ReactRouter />
        </i>
      );
    case "Sass":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-sass"
          style={{ ...layout }}
        >
          <Svg.Sass />
        </i>
      );
    case "ThreeJS":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-threejs"
          style={{ ...layout }}
        >
          <Svg.ThreeJS />
        </i>
      );
    case "TypeScript":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-typescript"
          style={{ ...layout }}
        >
          <Svg.TypeScript />
        </i>
      );
    case "Vite":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-vite"
          style={{ ...layout }}
        >
          <Svg.Vite />
        </i>
      );
    case "Webpack":
      return (
        <i
          {...props}
          className="tech-icon--simple-icons si-webpack"
          style={{ ...layout }}
        >
          <Svg.Webpack />
        </i>
      );
    default:
      return <Fragment />;
  }
};

export default SimpleIcon;
