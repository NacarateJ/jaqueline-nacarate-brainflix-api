// functions not related to APIs
const { v4: uuidv4 } = require("uuid"); //code from uuid documentation
const fs = require("node:fs");



// function to create a new id using uuid
const getNewId = () => {
  return uuidv4();
};


// function to write to the json file
const writeJSONFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
        if (err) console.log(err);
        console.log(`changes saved to ${filename}`);
    });
};



module.exports = {
    getNewId,
    writeJSONFile
};