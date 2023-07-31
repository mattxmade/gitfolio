// Dependencies
import "server-only";

import { ownerConfig, headers, octokit } from "./ownerConfig";
import getCommits from "./getCommits";

// types
import { DirectoryItem } from "./types";

// API request to get file contents | path to directory : name of repository
export const getDirectoryContents = async (path: string, repo: string) => {
  try {
    const contents = await octokit.rest.repos.getContent({
      path,
      repo,
      headers,
      owner: ownerConfig.owner as string,
    });

    // Only want data
    return contents.data;
  } catch (error) {
    console.log("Error getting subdirectory >> " + error);
    return "Failed: Directory contents";
  }
};

// API request to get file contents | url is a property from file object
export const getFileContents = async (url: string) => {
  try {
    const source = await octokit.request(`GET ${url}`, { headers });
    return source.data;
  } catch (error) {
    console.log("File download error >> " + error);
    return "File download failed";
  }
};

const { omit } = ownerConfig;

// Iterate over contents and return new item in place following schema
const editItemProperties = (contents: DirectoryItem[]) =>
  contents.map((item: DirectoryItem) => {
    omit.properties.forEach((prop) => item[prop] && delete item[prop]);

    return item;
  });

const { ignore } = ownerConfig;

// Filter dir(s)/file(s) that are not required | examples >> dir: media, assets | extenstions: .jpg, .webp
const contentsFilter = (contents: DirectoryItem[]) =>
  contents.filter((item: DirectoryItem) => {
    if (item.type === "symlink") return;

    if (ignore.directories.includes(item.name)) return;
    if (ignore.extensions.some((ext: string) => item.name.includes(ext)))
      return;

    return item;
  });

// Unpack repository | process content
const unpackRepoContent = async (
  data: DirectoryItem[],
  repoName: string,
  requireCommits: boolean
) =>
  contentsFilter([...data]).map(async (item: DirectoryItem) => {
    if (item.type === "file" || item.type === "submodule") {
      if (!item.download_url) return item;

      // Get file contents | TODO: Handle catch
      const download = await getFileContents(item.download_url);

      if (requireCommits) {
        const commits = await getCommits({
          sha: undefined,
          repo: repoName,
          path: item.path,
          owner: ownerConfig.owner as string,
        });

        item.commits = commits;
      }

      item.download = download;
      return item;
    }

    if (item.type === "dir") {
      // Get contents from current directory | TODO: Handle catch
      const subdirectory = await getDirectoryContents(item.path, repoName);

      const contents = (await Promise.all([
        ...(await unpackRepoContent(
          subdirectory as DirectoryItem[],
          repoName,
          requireCommits
        )),
      ])) as DirectoryItem[] | [];

      item.contents = contents
        ? editItemProperties(contents as DirectoryItem[])
        : [];

      return item;
    }
  });

// Content Request Type Definition
type IContentRequest = {
  owner: string;
  repo: string;
  path: string;
  headers: { accept: string; "X-GitHub-Api-Version": string };
};

type IContentResponse = {
  status: number;
  message: string;
  data: object | Array<object> | [];
};

const handleRepoContentRequest = async (request: string, rCommits: boolean) => {
  // Check if repository exists against list of available repositories
  const availableRepositories = ownerConfig.repositories.available as string[];

  if (!availableRepositories.some((project) => project === request))
    return {
      data: [],
      message: "Not Found",
      status: 404,
    } as IContentResponse;

  // Construct new response object after repo check
  const response = {} as IContentResponse;

  const reqRootContents = {
    headers,
    path: "",
    repo: request,
    owner: ownerConfig.owner,
  } as IContentRequest;

  try {
    // Make a request to GitHub API | GET repository content | array
    const rootContents = await octokit.rest.repos.getContent(reqRootContents);

    // Unpack and process data | Resolve all Promises, await responses | array
    const contents = Array.isArray(rootContents.data)
      ? await Promise.all([
          ...((await unpackRepoContent(
            rootContents.data as DirectoryItem[],
            reqRootContents.repo,
            rCommits
          )) as Promise<DirectoryItem>[]),
        ])
      : [];

    // Construct new repository object
    const newRepo = {
      name: reqRootContents.repo,
      contents: contents ? editItemProperties(contents) : [],
    };

    // Returns 200 | Set success message
    response.data = newRepo;
    response.status = rootContents.status;
    response.message = "Repository contents fetched successfully";
  } catch (error: any) {
    // returns 404 : Not Found | REASON > No access || Repo not found || Incorrect credentials
    response.status = error.status;
    response.message = error.response.data.message;
  }

  // return response
  return new Response(JSON.stringify(response), {
    status: response.status,
    headers: {
      "content-type": "application/json",
    },
  });
};

const github = {
  octokit,
  handleRepoContentRequest,
};

export default github;
