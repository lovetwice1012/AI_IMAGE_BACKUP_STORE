const fs = require("fs");

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

for (var value of list) {
    const { exec } = require('child_process')

    exec('git update-index --assume-unchanged ' + value, (err, stdout, stderr) => {
        if (err) {
            console.log(`stderr: ${stderr}`)
            return
        }
        console.log(`stdout: ${stdout}`)
    }
    )
}