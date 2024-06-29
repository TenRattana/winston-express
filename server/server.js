const { accessLogger, rejectionLogger } = require("./winston/winston.js");
const {app} = require("./app.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  accessLogger.info(`Server start at port ${PORT}`);
});
