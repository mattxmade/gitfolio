import { Octokit } from "octokit";
import { ownerConfig } from "./ownerConfig";

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

const { ignore } = ownerConfig;

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

// Iterate over contents and return new item in place following schema
const editItemProperties = (contents: Array<any>) =>
  contents.map((item) => {
    // New item based schema | directory OR file
    const itemSchema = {
      ...(item.type === "dir"
        ? ownerConfig.schema.directory.properites
        : ownerConfig.schema.file.properites),
    };

    // If property exists, replace placeholder value with item value

    // TODO: Add index property to type defintion
    // for (const [key, value] of Object.entries(item)) {
    //   if (itemSchema[key as any]) itemSchema[key] = value;
    // }

    // Return new item with only essential properties
    return itemSchema;
  });

// Filter dir(s)/file(s) that are not required | examples >> dir: media, assets | extenstions: .jpg, .webp
const contentsFilter = (contents: Array<any>) =>
  contents.filter((item) => {
    if (ignore.directories.includes(item.name)) return;
    if (ignore.extensions.some((ext: string) => item.name.includes(ext)))
      return;

    return item;
  });

// Unpack repository | process content
const unpackRepoContent = async (data: Array<any>, repoName: string) =>
  contentsFilter(data).map(async (item) => {
    if (item.type === "file" || item.type === "submodule") {
      // console.log("Filename: " + item.name);

      // Get file contents | TODO: Handle catch
      const download = await getFileContents(item.download_url);

      item.download = download;
      return item;
    }

    if (item.type === "dir") {
      // console.log("Directory: " + item.name);

      // Get contents from current directory | TODO: Handle catch
      const subdirectory = await getDirectoryContents(item.path, repoName);

      // Resolve all Promises from recursive fn call
      const contents = await Promise.all([
        ...(await unpackRepoContent(subdirectory as any, repoName)),
      ]);

      item.contents = editItemProperties(contents);
      return item;
    }
  });

const handleRepoContentRequest = async (req: Request) => {
  const response = {} as {
    status: number;
    message: string;
    data: object | Array<object>;
  };

  try {
    // Make a request to GitHub API | GET repository content | array
    const repoContent = await octokit.rest.repos.getContent(
      requestConfig as any
    );

    // Unpack and process data | Resolve all Promises, await responses | array
    const contents = await Promise.all([
      ...(await unpackRepoContent(
        repoContent.data as any,
        requestConfig.repo as any
      )),
    ]);

    // Construct new repository object
    const newRepo = {
      name: requestConfig.repo,
      contents: editItemProperties(contents),
    };

    // Returns 200 | Set success message
    response.data = newRepo;
    response.status = repoContent.status;
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
  // return response
  return new Response(JSON.stringify(response), {
    status: response.status,
    headers: {
      "content-type": "application/json",
    },
  });
};

const github = { handleRepoContentRequest };

module.exports = github;
