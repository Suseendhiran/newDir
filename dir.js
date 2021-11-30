var os = require("os");
var fs = require("fs");
// console.log(os.freemem());
// console.log(os.totalmem());
// //console.log(os.version());
// console.log(os.cpus());

// const [, , c, ...numbers] = process.argv;
// console.log("Max element", c.slice(0), c.slice(-1));
fs.readFile("./firstFile.txt", "utf-8", (err, data) => {
  console.log("data read", data);
});
fs.writeFile("./secondFile.txt", "Second quote!!", (err, data) => {
  console.log("Completed writing", data);
});
for (let i = 0; i < 5; i++) {
  fs.appendFile(
    `./backup/file${i + 1}.txt`,
    `\nquotes appended ${i + 1}!!`,
    (err, data) => {
      console.log("Completed writing", data);
    }
  );
}
// fs.unlink("./firstFile.txt", (err) => {
//   console.log("Deleted");
// });
fs.readdir("./backup", (err, files) => {
  console.log(files);
});
