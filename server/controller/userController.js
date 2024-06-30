const { accessLogger, rejectionLogger } = require("../winston/winston.js");
const fs = require("fs");
const xml2js = require("xml2js");
const path = require("path");
const { dd } = require("../dump-die/dd.js");
const Joi = require("joi");

const parser = new xml2js.Parser();
const builder = new xml2js.Builder();

const setup = require("../xml/database.js");

setup.setupUser();

const xmlDir = setup.xmlDirUser;
const xmlFilePath = path.join(xmlDir, "user.xml");

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
  const valid = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
  });

  const { err, value } = valid.validate(req.body);

  if (err) {
    return res.status(400).json({ error: err.details.map((d) => d.message) });
  }

  const newUser = {
    user: {
      name: value.name,
      age: value.age,
    },
  };

  fs.readFile(xmlFilePath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    parser.parseString(data, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        res.status(500).send("Error parsing XML");
        return;
      }

      if (typeof result.users === "string") result.users = newUser;
      else result.users.user.push(newUser.user);

      const updatedXML = builder.buildObject(result);

      fs.writeFile(xmlFilePath, updatedXML, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).send("Error writing file");
          return;
        }

        console.log("Insert User is success!");
        res.status(200).send("Insert User is success!");
      });
    });
  });
}

module.exports = { getUsers, insertUser };
