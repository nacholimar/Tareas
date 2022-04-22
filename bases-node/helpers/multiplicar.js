const fs = require("fs");
const color = require("colors");

const crearArchivo = async (base = 5, listar = false, hasta=10) => {
  try {
    let salida = "";
    let consola = "";
    for (i = 1; i <= hasta; i++) {
      salida += `${base} x ${i} = ${base * i}\n`;
      consola += `${base} ${'x'.cyan} ${i} ${'='.cyan} ${base * i}\n`;
    }

    if (listar) {
      console.log(`====================`.cyan);
      console.log(`    Tabla del:`.cyan, color.red(base));
      console.log(`====================`.cyan);
      console.log(consola);
    }

    fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

    return `tabla-${base}.txt`.rainbow;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearArchivo,
};
