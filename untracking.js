const fs = require("fs");
const { execSync } = require('child_process')
const readdirRecursively = (dir, files = []) => {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const dirs = [];
    for (const dirent of dirents) {
        if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`);
        if (dirent.isFile() && (dirent.name.endsWith("png") || dirent.name.endsWith("jpg"))) files.push(`${dir}/${dirent.name}`);
    }
    for (const d of dirs) {
        files = readdirRecursively(d, files);
    }
    return files;
};
var list = readdirRecursively("./")
console.log(list);
i = 0;
for (var value of list) {
    i++
    console.log(`[${i}/${list.length}] stdout: ${execSync('git update-index --assume-unchanged ' + value)}`)
}