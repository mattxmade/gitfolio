"use client";
import React, { CSSProperties } from "react";
import useClient from "../hooks/useClient";

type Props = {
  size?: string;
  color?: string;
  children: React.ReactNode;
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

const LoadingSpinner = ({ children }: Props) => {
  const ready = useClient();

  return !ready ? (
    <div style={style.div} className="loading">
      <i style={style.icon} className="fa fa-solid fa-spinner" />
    </div>
  ) : (
    <>{children}</>
  );
};

export default LoadingSpinner;
