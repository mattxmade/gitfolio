// CodeMirror Languages
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";

const languages = [
  ".js",
  ".ts",
  ".md",
  ".jsx",
  ".tsx",
  ".css",
  ".html",
  ".scss",
  ".json",
];

const getLanguage = (filename: string) => {
  if (typeof filename !== "string") return markdown();

  const prefix = languages.find(
    (prefix) => filename.includes(prefix) && prefix
  );

  switch (prefix) {
    case ".js":
      return javascript();
    case ".jsx":
      return javascript({ jsx: true });

    case ".ts":
      return javascript({ typescript: true });
    case ".tsx":
      return javascript({ typescript: true, jsx: true });

    case ".html":
      return html();
    case ".css":
      return css();
    case ".scss":
      return css();

    case ".json":
      return json();
    case ".md":
      return markdown();

    default:
      return markdown();
  }
};

export default getLanguage;
