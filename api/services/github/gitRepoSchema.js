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

// File has list of commit objects
const file = {
  title: "File",
  description: "File submodule item",
  type: "object",

  properites: {
    name: {
      description: "Name of file",
      type: "string",
    },
    path: {
      description: "File path",
      type: "string",
    },
    size: {
      description: "File size",
      type: "number",
    },
    type: {
      description: "Submodule type",
      type: "string",
    },
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
  title: "Directory submodule item",
  description: "Directory submodule",
  type: "array",

  properites: {
    name: {
      description: "Name of directory",
      type: "string",
    },
    path: {
      description: "Directory path",
      type: "string",
    },
    size: {
      description: "Directory size",
      type: "number",
    },
    type: {
      description: "Submodule type",
      type: "string",
    },
    contents: {
      description: "Contents of directory",
      type: "array",
      minItems: 0,

      items: {
        description: "List of directory submodules",
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
        description: "List of repository submodules",
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
  directory,
  file,
  commit,
  patch,
};
