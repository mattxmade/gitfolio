import {
  differenceInSeconds,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  getYear,
  getMonth,
  getDate,
  format,
} from "date-fns";

import {
  App_CommitItem,
  DirectoryContents,
} from "@/app/api/services/github/types";

// example commit date: "2023-03-17T10:10:38Z";

const isAgeAboveOne = (date: number) => (date > 1 ? true : false);

const processDifference = (date: number, type: string): string | undefined => {
  let text: string = "";

  // if age is negative int, convert to positive int
  date < 0 ? (date = -date) : date;

  switch (type) {
    case "year":
      text = isAgeAboveOne(date) ? `${date} years ago` : "last year";
      break;

    case "month":
      text = isAgeAboveOne(date) ? `${date} months ago` : "last month";
      break;

    case "week":
      text = isAgeAboveOne(date) ? `${date} weeks ago` : "last week";
      break;

    case "day":
      text = isAgeAboveOne(date) ? `${date} days ago` : "yesterday";
      break;
  }

  return text;
};

const formatCommitData = (date: string): string => {
  if (!date) return "";

  const commitYear = Number(date.slice(0, 4));
  const commitMonth = Number(date.slice(5, 7)) - 1;
  const commitDay = Number(date.slice(8, 10));

  return format(new Date(commitYear, commitMonth, commitDay), "LLL, d, yyyy")
    .split("")
    .map((char) => {
      if (char === ",") char = "";
      return char;
    })
    .join("");
};

export const processCommitDate = (date: string) => {
  if (!date) return;

  // Date now
  const dateToday = Date.now();
  const currentYear = getYear(dateToday);
  const currentMonth = getMonth(dateToday) + 1;
  const currentDay = getDate(dateToday);

  // Commit date
  const commitYear = Number(date.slice(0, 4));
  const commitMonth = Number(date.slice(5, 7));
  const commitDay = Number(date.slice(8, 10));

  type IDifferneceCallback = (
    dateLeft: number | Date,
    dateRight: number | Date
  ) => number;

  const get = (differenceCallback: IDifferneceCallback) =>
    differenceCallback(
      new Date(commitYear, commitMonth, commitDay),
      new Date(currentYear, currentMonth, currentDay)
    );

  // Returns commit date formatted in correct past tense based on age
  const yearsDiff = get(differenceInYears);
  if (yearsDiff < 0) return processDifference(yearsDiff, "year");

  const monthsDiff = get(differenceInMonths);
  if (monthsDiff < 0) return processDifference(monthsDiff, "month");

  const weeksDiff = get(differenceInWeeks);
  if (weeksDiff < 0) return processDifference(weeksDiff, "week");

  const daysDiff = get(differenceInDays);
  if (daysDiff < 0) return processDifference(daysDiff, "day");

  // TODO: Add differenceInSeconds
};

export type IFormatCommit = {
  date: string;
  commits: { byDate: App_CommitItem[]; all: App_CommitItem[] };
};

export const sortCommitsByDate = (commitsToSort: Array<App_CommitItem>) => {
  const commitDates: Array<string> = [];

  [...commitsToSort].forEach((commit) => {
    const date = formatCommitData(commit.author.date);
    !commitDates.includes(date) && commitDates.push(date);
  });

  // Format and sort commits
  return [...new Array(commitDates.length)].map((item: IFormatCommit, i) => {
    item = {
      date: commitDates[i],
      commits: { byDate: [], all: commitsToSort },
    };

    commitsToSort.forEach((commit) => {
      formatCommitData(commit.author.date) === item.date &&
        item.commits.byDate.push(commit);
    });

    return item;
  });
};

import {
  DirectoryItem,
  App_DirectoryItem,
  App_SubmoduleItem,
} from "@/app/api/services/github/types";

export const getLastCommit = (directory: DirectoryItem[]) => {
  let commit;

  directory.find((item) => {
    if (item.type !== "file") return undefined;

    const file = item as unknown as App_SubmoduleItem;
    commit = file.commits && file.commits[0];
  });

  if (!commit) return;
  return commit as App_CommitItem;
};

export const processGitDateFormat = (date: string) =>
  Number(
    date
      .replaceAll("-", "")
      .replaceAll("T", "")
      .replaceAll(":", "")
      .slice(0, -1)
  );

type ExCommit = Partial<App_CommitItem> & {
  gitDate: number;
};

export const getLatestCommit = (
  contents: DirectoryContents,
  fileStore: App_SubmoduleItem[],
  recursive?: boolean
) => {
  const commits: Array<ExCommit> = [];
  let lastCommit: Partial<App_CommitItem> | undefined;

  contents.forEach((submodule) =>
    submodule.type === "dir"
      ? recursive &&
        getLatestCommit(submodule.contents as DirectoryContents, fileStore)
      : fileStore.push(submodule as App_SubmoduleItem)
  );

  fileStore &&
    fileStore.map((file) =>
      [...new Array(file.commits.length)].map((exCommit: ExCommit, i) => {
        exCommit = file.commits[i] as ExCommit;

        exCommit.gitDate = processGitDateFormat(file.commits[i].author.date);
        commits.push(exCommit);

        const sha = commits.sort((a, z) => z.gitDate - a.gitDate)[0].sha;
        const commit = sha && commits.find((commit) => commit.sha === sha);

        commit && (lastCommit = commit);
      })
    );

  if (lastCommit) return lastCommit as App_CommitItem;
};

type App_CommitItem_Modifier = App_CommitItem & { gitDate: number };

export const getCurrentDirectoryLastCommit = (dir: DirectoryContents) => {
  const files: App_SubmoduleItem[] = [];
  const commits: Array<App_CommitItem_Modifier> = [];

  // map over current directory contents
  // include only files
  dir.map((item) => {
    if (item.type === "file" || item.type === "submodule") {
      files.push({ ...item } as App_SubmoduleItem);
    }
  });

  // map over files, push commit
  if (files) {
    files.map((file) =>
      file.commits.map((commit) =>
        commits.push(commit as App_CommitItem_Modifier)
      )
    );
  }

  // sort all file commits - most recent first
  // add gitDate modifier so we can sort commits
  if (commits) {
    commits.map(
      (commit) =>
        commit.author.date &&
        (commit.gitDate = processGitDateFormat(commit.author.date))
    );
  }

  // sorted commits - most recent commit first
  // grab first commit item as this is the most recent
  return commits.sort((a, z) => z.gitDate - a.gitDate)[0] as App_CommitItem;
};
