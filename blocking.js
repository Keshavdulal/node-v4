// const fs = require('fs') // sync
const fs = require("fs/promises"); // async
const path = require("path");

// Sync - blocking approach
// const result = fs.readFileSync(path.join(__dirname, "package.json"), "utf-8");

// Async - Non-Blocking approach
const read = async () => {
  const result = fs.readFile(path.join(__dirname, "package.json"), "utf-8");
  // 1st
  console.log("@read -> ", result);

  return result;
};

// 3rd
read().then((file) =>
  console.log("@Promise Resolved -> ", file.substring(0, 10))
);

// 2nd
console.log("hi");
