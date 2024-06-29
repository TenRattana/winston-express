const { rejectionLogger } = require("../winston/winston.js");

async function reject(_req, res, _next) {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Simulating unhandled rejection"));
      }, 1000);
    });

    res.send("Success");
  } catch (error) {
    console.error("Error:", error);
    rejectionLogger.error(`Unhandled Rejection at: ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { reject };
