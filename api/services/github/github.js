const { Octokit } = require("octokit");
const { ownerConfig } = require("./ownerConfig");

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

const { ignoreList } = ownerConfig;

// API call to get file contents | url is a property from file object
const getFileContents = async (url) => {
  try {
    const source = await octokit.request(`GET ${url}`, { headers });
    return source.data;
  } catch (error) {
    console.log("File download error >> " + error);
    return "File download failed";
  }
};

// Filter dir(s)/file(s) that are not required | examples >> dir: media, assets | extenstions: .jpg, .webp
const contentFilter = (array) =>
  array.filter((item) => {
    if (ignoreList.directories.includes(item.name)) return;
    if (ignoreList.extensions.some((ext) => item.name.includes(ext))) return;

    return item;
  });

// Unpack repository | process content
const unpackRepoContent = async (arrayToUnpack) =>
  contentFilter(arrayToUnpack).map(async (item) => {
    if (item.type === "file" || item.type === "submodule") {
      console.log("Filename: " + item.name);

      const download = await getFileContents(item.download_url);
      item.download = download;

      console.log(item.download);
      return item;
    }

    if (item.type === "dir") {
      console.log("Directory: " + item.name);
    }
  });

const handleRepoContentRequest = async (req, res, next) => {
  let response = { status: "string", message: "string" };

  try {
    // Make a request to GitHub API | GET repository content
    const repoContent = await octokit.rest.repos.getContent(requestConfig);

    // Unpack and process data
    const contents = await unpackRepoContent(repoContent.data);
    // console.log(contents);

    // Returns 200 | Set success message
    response.status = repoContent.status;
    response.message = "Repository contents fetched successfully";
  } catch (error) {
    // returns 404 : Not Found | REASON > No access || Repo not found || Incorrect credentials
    response.status = error.status;
    response.message = error.response.data.message;
  }

  // Remaining requests after calling API
  console.log(
    (await octokit.request("GET /rate_limit", rateLimitConfig)).data.rate
  );

  // return response
  res.status(response.status).send(response);
};

const github = { handleRepoContentRequest };

module.exports = github;
