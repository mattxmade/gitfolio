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

// Filter dir(s)/file(s) that are not required | examples >> dir: media, assets | extenstions: .jpg, .webp
const contentFilter = (array) =>
  array.filter((item) => {
    if (ignoreList.directories.includes(item.name)) return;
    if (ignoreList.extensions.some((ext) => item.name.includes(ext))) return;

    return item;
  });

// Unpack repository | process content
const unpackRepoContent = (arrayToUnpack) =>
  contentFilter(arrayToUnpack).map((submodule) => submodule);

const handleRepoContentRequest = async (req, res, next) => {
  let response = { status: "string", message: "string" };

  try {
    // Make a request to GitHub API | GET repository content
    const repoContent = await octokit.rest.repos.getContent(requestConfig);

    // Unpack and process data
    const contents = unpackRepoContent(repoContent.data);
    console.log(contents);

    // Returns 200 | Set success message
    response.status = repoContent.status;
    response.message = "Repository contents fetched successfully";
  } catch (error) {
    // returns 404 : Not Found | REASON > No access || Repo not found || Incorrect credentials
    response.status = error.status;
    response.message = error.response.data.message;
  }

  // Remaining requests after calling API
  console.log((await octokit.request("GET /rate_limit", rateLimitConfig)).data);

  // return response
  res.status(response.status).send(response);
};

const github = { handleRepoContentRequest };

module.exports = github;
