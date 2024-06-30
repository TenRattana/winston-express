const { accessLogger, rejectionLogger } = require("../winston/winston.js");
const fs = require("fs");
const xml2js = require("xml2js");
const path = require("path");
const { dd } = require("../dump-die/dd.js");

const xmlDir = "xml\\users";
const xmlFilePath = path.join(xmlDir, "user.xml");

if (!fs.existsSync(xmlDir)) {
  fs.mkdirSync(xmlDir, { recursive: true });

  const initialContent =
    '<?xml version="1.0" encoding="UTF-8"?><users><user><name/><age/></user></users>';
  fs.writeFile(xmlFilePath, initialContent, (err) => {
    if (err) {
      console.error("Error creating file:", err);
      res.status(500).send("Error creating file");
      return;
    }

    console.log("File created successfully");
  });
}

function getUsers(req, res, next) {
  const xml = fs.readFileSync(xmlFilePath, "utf-8");
  const parser = new xml2js.Parser();
  parser.parseString(xml, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error : " + err);
      return;
    }
    console.log(result);
    res.status(200).send(result);
  });
}

function insertUser(req, res, next) {
  const newUser = {
    user: {
      name: "Rattana",
      age: 30,
    },
  };

  fs.readFile(xmlFilePath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    // แปลง XML เป็น JSON
    const parser = new xml2js.Parser();
    parser.parseString(data, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        res.status(500).send("Error parsing XML");
        return;
      }

      // เพิ่มข้อมูลใหม่ลงใน JSON
      result.users.user = result.users.user || [];
      result.users.user.push(newUser.user);

      // แปลง JSON กลับเป็น XML
      const builder = new xml2js.Builder();
      const updatedXML = builder.buildObject(result);

      // เขียน XML กลับไปยังไฟล์
      fs.writeFile(xmlFilePath, updatedXML, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).send("Error writing file");
          return;
        }

        console.log("File updated successfully");
        res.status(200).send("File updated successfully");
      });
    });
  });
}

module.exports = { getUsers, insertUser };
