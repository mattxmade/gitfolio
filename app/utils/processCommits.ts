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

import { App_CommitItem } from "@/api/services/github/types";

// example commit date: "2023-03-17T10:10:38Z";

const isAgeAboveOne = (date: number) => (date > 1 ? true : false);

const processDifference = (date: number, type: string): string | undefined => {
  let text: string = "";

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
