const argv = require("yargs")
  .option("b", {
    alias: "base",
    demandOption: true,
    describe: "Base de la tabla",
    type: "number",
  })
  .option("l", {
    alias: "listar",
    demandOption: true,
    default: false,
    describe: "Mostrar en consola",
    type: "boolean",
  })
  .option("h", {
    alias: "hasta",
    demandOption: true,
    default: 10,
    describe: "Limite de la tabla",
    type: "number",
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw "La base tiene que ser un número.";
    }
    return true;
  }).argv;

module.exports = argv;
