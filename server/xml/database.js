const { accessLogger } = require("../winston/winston.js");
const fs = require("fs");
const xml2js = require("xml2js");
const path = require("path");

const xmlDirUser = "xml\\users";

function setupUser() {
  const xmlFilePath = path.join(xmlDirUser, "user.xml");

  if (!fs.existsSync(xmlDirUser)) {
    fs.mkdirSync(xmlDirUser, { recursive: true });

    const initialContent =
      '<?xml version="1.0" encoding="UTF-8"?><users></users>';
    fs.writeFile(xmlFilePath, initialContent, (err) => {
      if (err) {
        console.error("Error creating file:", err);
        accessLogger.error("Error creating file");
        return;
      }

      accessLogger.info("File created successfully");
    });
  }
}

module.exports = { setupUser, xmlDirUser };
