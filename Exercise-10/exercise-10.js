const fs = require("fs");

fs.writeFile("File.txt", "This is exercise 10", () => {
    console.log(`The file has been created.`);
});
