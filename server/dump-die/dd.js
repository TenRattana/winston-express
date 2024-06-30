const util = require('util');

function dd(...args) {
  args.forEach(arg => {
    console.log(util.inspect(arg, { showHidden: false, depth: null, colors: true }));
  });
  process.exit(1);
}

module.exports = { dd };