require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();
const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  const traeasDB = leerDB();

  if (traeasDB) {
    tareas.cargarTareasFromArray(traeasDB);
  }
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion:');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        const ids = await mostrarListadoCheckList(tareas.listarArr);
        tareas.toogleCompletadas(ids);
        break;

      case '6':
        const id = await listadoTareasBorrar(tareas.listarArr);
        if (id !== '0') {
          console.log({ id });
          const ok = await confirmar('¿Esta seguro?');
          if (ok) {
            tareas.borrarTrea(id);
            console.log('Tarea borrada.');
          }
        }
        break;
      default:
        break;
    }

    guardarDB(tareas.listarArr);
    await pausa();
  } while (opt !== '0');
};

main();
