const path = require("path");
const fs = require("fs");
const process = require("process");
const childProcess = require("child_process");

const languageMap = {
  ts: { template: "typescript", entry: "index.tsx" },
  js: { template: "javascript", entry: "index.jsx" },
};

function renameInFiles(files, from, to) {
  for (const filePath of files) {
    const contents = fs.readFileSync(filePath).toString();
    const newContents = contents.replace(from, to);
    fs.writeFileSync(filePath, newContents);
  }
}

const getFilesInDir = (dir) =>
  fs
    .readdirSync(dir, { recursive: true })
    .map((file) => path.resolve(dir, file))
    .filter((entry) => fs.lstatSync(entry).isFile());

function generateProject(answers) {
  const { dir, name, language } = answers;
  const destDir = path.resolve(dir);
  const languageSelection = languageMap[language];
  if (!languageSelection) {
    console.log(`Invalid language selection: ${answers.language}`);
    return;
  }
  console.log(`Creating project in ${destDir}`);
  const baseTemplate = path.resolve(__dirname, "../templates/base");
  const languageTemplate = path.resolve(
    __dirname,
    `../templates/${languageSelection.template}`
  );
  fs.cpSync(baseTemplate, destDir, { recursive: true });
  fs.cpSync(languageTemplate, destDir, { recursive: true });

  const files = getFilesInDir(destDir);
  renameInFiles(files, "__NAME__", name);
  renameInFiles(files, "__ENTRY__", languageSelection.entry);
  process.chdir(destDir);
  childProcess.execSync("npm install", { stdio: "inherit" });
  childProcess.execSync("npm update", { stdio: "inherit" });
  console.log(`Project created in ${destDir}. See README.md for next steps.`);
}

module.exports = generateProject;
