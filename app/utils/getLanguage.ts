// CodeMirror Languages
import { cssLanguage } from "@codemirror/lang-css";
import { jsonLanguage } from "@codemirror/lang-json";
//import { htmlLanguage } from "@codemirror/lang-html";
//import { markdownLanguage } from "@codemirror/lang-markdown";
import {
  javascriptLanguage,
  jsxLanguage,
  //typescriptLanguage,
  //tsxLanguage,
} from "@codemirror/lang-javascript";

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
  if (typeof filename !== "string") return jsxLanguage;

  const prefix = languages.find(
    (prefix) => filename.includes(prefix) && prefix
  );

  switch (prefix) {
    case ".js":
      return javascriptLanguage;
    case ".jsx":
      return jsxLanguage;

    case ".ts":
      return javascriptLanguage; // typescriptLanguage;
    case ".tsx":
      return jsxLanguage; // tsxLanguage;

    case ".html":
      return jsxLanguage; // htmlLanguage;
    case ".css":
      return cssLanguage;
    case ".scss":
      return cssLanguage;

    case ".json":
      return jsonLanguage;

    // bug: crashes in production
    // case ".md":
    //   return markdownLanguage;

    default:
      return jsxLanguage;
  }
};

export default getLanguage;
