"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

const Portal = ({ children, id, className }: PortalProps) => {
  const [parentElement, setParentElement] = useState<Element | null>(null);

  const handleParentElement = () => {
    const portalTo = !className
      ? document.getElementById(id)
      : document.getElementById(id)?.querySelector(`.${className}`);

    return portalTo || null;
  };

  const onComponentUpdate = () => {
    if (!parentElement && document) {
      setParentElement(handleParentElement());
    }
  };

  const onComponentUnmount = () => {
    setParentElement(null);
  };

  useEffect(() => {
    onComponentUpdate();
  });

  useEffect(() => {
    return () => {
      onComponentUnmount();
    };
  }, []);

  if (!parentElement) return <></>;
  return createPortal(children, parentElement);
};

export default Portal;

// React Portals
// https://react.dev/reference/react-dom/createPortal
// https://dev.to/ataparvinghods/react-portals-and-how-to-use-them-next-js-and-cra-2dic
