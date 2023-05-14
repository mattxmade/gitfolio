// Dependencies
import "server-only";
import { Octokit } from "octokit";

import { ownerConfig } from "./ownerConfig";

// types
import { DirectoryItem } from "./types";

// Authenticate API access using Octokit
const octokit = new Octokit({ auth: process.env.TKN });

// Set API version | In case of breaking changes in future versions
const headers = { "X-GitHub-Api-Version": process.env.API_VERSION };

const rateLimitConfig = {
  headers,
  owner: ownerConfig.owner,
};

const requestConfig = {
  headers,
  owner: ownerConfig.owner,
  repo: ownerConfig.repo,
};

// API request to get file contents | path to directory : name of repository
const getDirectoryContents = async (path: string, repo: string) => {
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
const getFileContents = async (url: string) => {
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
const unpackRepoContent = async (data: DirectoryItem[], repoName: string) =>
  contentsFilter([...data]).map(async (item: DirectoryItem) => {
    if (item.type === "file" || item.type === "submodule") {
      if (!item.download_url) return item;

      // Get file contents | TODO: Handle catch
      const download = await getFileContents(item.download_url);

      item.download = download;
      return item;
    }

    if (item.type === "dir") {
      // Get contents from current directory | TODO: Handle catch
      const subdirectory = await getDirectoryContents(item.path, repoName);

      // Resolve all Promises from recursive fn call
      const contents = (await Promise.all([
        ...(await unpackRepoContent(subdirectory as DirectoryItem[], repoName)),
      ])) as DirectoryItem[] | [];

      item.contents = contents ? editItemProperties(contents) : [];
      return item;
    }

    return item;
  });

// Content Request Type Definition
type IContentRequest = {
  owner: string;
  repo: string;
  path: string;
  headers: { accept: string; "X-GitHub-Api-Version": string };
};

const handleRepoContentRequest = async (req: string) => {
  // TODO: handle request

  const response = {} as {
    status: number;
    message: string;
    data: object | Array<object>;
  };

  // if (!req) return // search for matching repo | don't want unnecessary calls

  const reqRootContents = {
    headers,
    path: "",
    repo: req,
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
            reqRootContents.repo
          )) as Promise<DirectoryItem>[]),
        ])
      : [];

    // Construct new repository object
    const newRepo = {
      name: reqRootContents.repo,
      contents: contents ? editItemProperties(contents) : contents,
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

  // Remaining requests after calling API
  console.log(
    (await octokit.request("GET /rate_limit", rateLimitConfig)).data.rate
  );

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
