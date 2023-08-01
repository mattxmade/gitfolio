"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import useAppContext from "../hooks/useAppContext";
import useScrollLock from "../hooks/useScrollLock";
import useTimers from "../hooks/useTimers";

type Props = {
  id: string;
  children?: React.ReactNode;
};

const FolderBtn = (props: Props) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const requiredPath = `/${props.id}/code`;

  const ctx = useAppContext("folder-context");

  const router = useRouter();
  const pathName = usePathname();

  const timer = useTimers();
  const scrollLock = useScrollLock();

  const [pressed, setIsPressed] = useState<boolean | null>(null);

  const onReloadTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const eventInterval = timer.create({
    options: { type: "interval", time: 1, abort: 20 * 1000 },
    task: {
      callback: onFolderLoaded,
      args: "repo-folder-" + props.id,
      message: {
        onStart: `Creating ${props.id} timers...`,
        onEnd: `Clearing ${props.id} timers...`,
      },
    },
  });

  const onPageLoad = () => {
    const path = { required: requiredPath, current: pathName };

    if (path.required === path.current && pressed === null) {
      //createTimers();
      eventInterval?.startTimers();
    }
  };

  function onFolderLoaded(ElementID: string) {
    //console.log(`Searching for ${props.id}...`);

    const curRepo = "repo-folder-" + props.id;
    const priority = document.getElementById(curRepo);

    if (!priority || !ctx) return;

    if (priority && !ctx.isHydrated.current) {
      ctx.isHydrated.current = true;

      handleButtonPress(null);
      //console.log(`${props.id} folder located`);
    }

    eventInterval?.clearTimers();
  }

  useEffect(() => {
    if (pathName === requiredPath && !ctx?.isHydrated.current) {
      onReloadTimeout.current = setTimeout(() => {
        onPageLoad();
        if (onReloadTimeout.current) clearTimeout(onReloadTimeout.current);
      }, 0);
    }
  }, []);

  useLayoutEffect(() => {
    onPageLoad();
  });

  const handleButtonPress = (e: MouseEvent<HTMLElement> | null) => {
    const repoFolder = document.getElementById("repo-folder-" + props.id);

    if (!repoFolder) return;

    repoFolder && repoFolder.classList.toggle("show-folder");

    ctx?.updateCurrentProjects("repo-folder-" + props.id, "ui", !pressed);
    setIsPressed(!pressed);
  };

  const controller = (e: MouseEvent<HTMLElement>) => {
    const hydrated = ctx?.isHydrated.current;

    if (!hydrated) return handleLink(e);

    handleButtonPress(e);
    window.history.replaceState(null, "Portfolio", requiredPath); // https://stackoverflow.com/a/61596862
  };

  const handleLink = (e: MouseEvent<HTMLElement>) => {
    scrollLock.lockScrollAtPosition();

    if (pathName === "/") router.push(`/${props.id}/code`);
    if (pathName !== "/") router.replace(`/${props.id}/code`);
  };

  const state = requiredPath + "?" + String(ctx?.isHydrated.current);

  return (
    <button
      ref={btnRef}
      id={"folder-btn-" + props.id}
      type="submit"
      style={{ width: "31.5px" }}
      onClick={controller}
      aria-aria-expanded={pressed}
      aria-label={`${props.id} folder button`}
    >
      <input type="hidden" name="path" value={state} />

      {props.children ? (
        props.children
      ) : (
        <i
          style={{ color: "lightblue" }}
          className={`fa fa-solid ${!pressed ? "fa-folder" : "fa-folder-open"}`}
        />
      )}
    </button>
  );
};
export default FolderBtn;
