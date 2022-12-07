import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve("7/input.txt"), "utf-8");
const lines = input.split("\n");

// Define the folder structure
type Folder = {
  name: string;
  parent?: Folder; // Root folder doesn't have a parent
  files: { name: string; size: number }[];
  folders: Folder[];
};

const root: Folder = { name: "/", files: [], folders: [] };
let currentFolder: Folder = root;

lines.forEach(line => {
  if (line.startsWith("$")) {
    const parts = line.split(" ");
    if (parts[2] === "/") return;
    if (parts[1] === "cd") {
      if (parts[2] === "..") {
        // Move up a folder
        currentFolder = currentFolder.parent || root;
      } else {
        // Move down a folder
        const folder = currentFolder.folders.find(
          folder => folder.name === parts[2]
        );
        if (folder) currentFolder = folder;
      }
    }
  } else {
    const parts = line.split(" ");
    if (parts[0] === "dir") {
      // Create a new folder
      currentFolder.folders.push({
        name: parts[1],
        folders: [],
        files: [],
        parent: currentFolder
      });
    } else {
      // Add a file to the current folder
      currentFolder.files.push({ name: parts[1], size: parseInt(parts[0]) });
    }
  }
});

// Recursively get folder sizes
const folderSizes: number[] = [];

const getTotalSizes = (folder: Folder) => {
  let size = 0;

  size += folder.files.reduce((sum, file) => sum + file.size, 0);

  folder.folders.forEach(folder => {
    const folderSize = getTotalSizes(folder);
    size += folderSize;

    folderSizes.push(folderSize);
  });

  return size;
};

// Run it on root
getTotalSizes(root);

const sumOfLessThan100K = folderSizes
  .filter(size => size <= 100000)
  .reduce((sum, size) => sum + size, 0);

console.log("Sum of sizes of folders less than 100k", sumOfLessThan100K);

// PART 2
const getTotalSize = (folder: Folder) => {
  let size = 0;

  size += folder.files.reduce((sum, file) => sum + file.size, 0);
  size += folder.folders.reduce((sum, folder) => sum + getTotalSize(folder), 0);

  return size;
};

const rootFileSize = root.files.reduce((sum, file) => sum + file.size, 0);
const rootFolderSize = root.folders
  .map(folder => getTotalSize(folder))
  .reduce((sum, folderSize) => sum + folderSize, 0);

const rootDiskSpace = 70000000;
const updateSpaceRequired = 30000000;
const diskSpaceUsed = rootDiskSpace - (rootFileSize + rootFolderSize);
const diskSpaceNeeded = updateSpaceRequired - diskSpaceUsed;

const deletableSizes = folderSizes.filter(size => size >= diskSpaceNeeded);
const smallestSizeRequired = Math.min(...deletableSizes);

console.log("Smallest size requried to update", smallestSizeRequired);
