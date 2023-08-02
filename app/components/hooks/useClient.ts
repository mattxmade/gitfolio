"use client";

import { useEffect, useRef, useState } from "react";

const useClient = () => {
  const [ready, setReady] = useState(false);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleReady = () => {
    if (window) {
      setReady(true);

      if (interval.current) clearInterval(interval.current);
    }
  };

  useEffect(() => {
    interval.current = setInterval(handleReady, 1);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  return ready;
};

export default useClient;
