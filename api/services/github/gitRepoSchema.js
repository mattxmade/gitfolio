const patch = {
  title: "Patch submodule item",
  description: "Commit patch details",
  type: "object",

  properites: {
    sha: {
      description: "Commit patch sha",
      type: "string",
    },
    filename: {
      description: "Commit filename",
      type: "string",
    },
    status: {
      description: "Status of commit",
      type: "string",
    },
    additions: {
      description: "Total number of additions",
      type: "number",
    },
    deletions: {
      description: "Total number of deletions",
      type: "number",
    },
    changes: {
      description: "Total number of changes",
      type: "number",
    },
    patch: {
      description: "Commit patch",
      type: "string",
    },
  },
  numOfProps: 7,
};

// Commit has list of patche objects
const commit = {
  title: "Commit submodule item",
  description: "Commit content",
  type: "object",

  properites: {
    author: {
      description: "Commit author and timestamp",
      type: "object",

      properites: {
        name: {
          description: "Commit author name",
          type: "string",
        },
        date: {
          description: "Commit date",
          type: "string",
        },
      },
    },

    message: {
      description: "Commit message",
      type: "string",
    },
    sha: {
      description: "Commit sha",
      type: "string",
    },
    files: {
      description: "List of file commit patches",
      type: "array",
      minItems: 1,

      items: {
        description: "List of commits",
        type: "object",
        item: { schema: { patch } },
      },
    },
  },
  numOfProps: 4,
};

// shared properties | file : directory
const core = {
  title: "Core properties",
  description: "Properties belonging to directories and files",

  properites: {
    name: {
      description: "Name of item",
      type: "string",
    },
    path: {
      description: "Item path",
      type: "string",
    },
    size: {
      description: "Item size",
      type: "number",
    },
    type: {
      description: "Item type",
      type: "string",
    },
  },
};

// File has list of commit objects
const file = {
  title: "File",
  description: "File submodule item",
  type: "object",

  properites: {
    name: core.properites.name,
    path: core.properites.path,
    size: core.properites.size,
    type: core.properites.type,

    commits: {
      description: "File commit history",
      type: "array",
      minItems: 1,

      items: {
        description: "List of file commits",
        type: "object",
        item: { schema: { commit } },
      },
    },
    download: {
      description: "File content",
      type: "string",
    },
  },
  numOfProps: 6,
};

// Directory has list of files and or directories
const directory = {
  title: "Directory",
  description: "Directory item",
  type: "array",

  properites: {
    name: core.properites.name,
    path: core.properites.path,
    size: core.properites.size,
    type: core.properites.type,

    contents: {
      description: "Contents of directory",
      type: "array",
      minItems: 0,

      items: {
        description: "List of items belonging to directory",
        type: "object",
        item: {
          schema: {
            file: file,
            directory: {},
          },
        },
      },
    },
  },
  numOfProps: 5,
};

// Directories can contain other directories
directory.properites.contents.items.item.schema.directory = directory;

// Repo contents has list of files and or directories
const gitRepo = {
  title: "Portfolio API: Git repository",
  description: "Details the expected data response from a Git repository",
  type: "object",

  properites: {
    name: {
      description: "Name of repository",
      type: "string",
    },
    contents: {
      description: "Contents of repository",
      type: "array",
      minItems: 0,

      items: {
        description: "List of repository items",
        type: "object",
        item: {
          schema: { file, directory },
        },
      },
    },
  },
  numOfProps: 2,
};

exports.gitRepoSchema = {
  gitRepo,
  core,
  directory,
  file,
  commit,
  patch,
};
