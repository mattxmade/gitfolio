"use client";
import React, { CSSProperties, useEffect, useRef } from "react";

type Props = {
  id: string;
  size?: string;
  color?: string;
  children?: React.ReactNode;
  monitorElementLoadingByID: string;
};

const div: CSSProperties = {
  width: "31.5px",
  height: "28px",

  overflow: "hidden",
  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const icon: CSSProperties = {
  color: "lightblue",
  fontSize: "28px",
};

const style = {
  div,
  icon,
};

const LoadingSpinner = ({ monitorElementLoadingByID, children }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loading = setInterval(() => {
      const element = document.getElementById(monitorElementLoadingByID);

      if (element && ref.current) {
        ref.current.remove();
        clearInterval(loading);
      }
    }, 0);
  });

  return (
    <div ref={ref} style={style.div} className="loading">
      <i style={style.icon} className="fa fa-solid fa-spinner" />
      {children ? (
        <div
          style={{
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            fontSize: "8px",
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default LoadingSpinner;
