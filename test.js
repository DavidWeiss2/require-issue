const fs = require("fs");
const path = require("path");
try {
  require("child_process").execSync("rm -rf node_modules");
} catch (err) {}
try {
  fs.mkdirSync("node_modules");
} catch (err) {}
try {
  require("pkg");
} catch (err) {
  console.log("failed requiering pkg");
}

try {
  require("child_process").execSync(
    "cp -r " + path.join(__dirname, "pkg") + " node_modules/pkg"
  );
} catch (err) {
  console.error(err);
}

try {
  console.log(require("pkg"));
} catch (err) {
  console.error("failed require from package json");
  const file = fs.readFileSync("./node_modules/pkg/package.json");
  const data = JSON.parse(file);
  const _path = path.join(__dirname, "node_modules/pkg/") + data.main;
  console.log("this works", require(_path));
}
