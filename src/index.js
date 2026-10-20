const { leerConfiguracion } = require("./config/entorno");
const { crearServicioReservas } = require("./servicios/reservas");
const { crearApp } = require("./app");

// Semilla original del TP 05: no se cambia ningún registro.
const reservasIniciales = [
  {
    id: 1,
    estudiante: "Lucía Gómez",
    email: "lucia@gmail.com",
    sala: "Sala Norte",
    fecha: "2026-09-22",
    turno: "Mañana",
    personas: 2,
  },
  {
    id: 2,
    estudiante: "Mateo Silva",
    email: "mateo@gmail.com",
    sala: "Sala Sur",
    fecha: "2026-09-22",
    turno: "Tarde",
    personas: 4,
  },
  {
    id: 3,
    estudiante: "Sofía Ruiz",
    email: "sofia@gmail.com",
    sala: "Sala Multimedia",
    fecha: "2026-09-23",
    turno: "Noche",
    personas: 3,
  },
  {
    id: 4,
    estudiante: "Tomás Díaz",
    email: "tomas@gmail.com",
    sala: "Sala Norte",
    fecha: "2026-09-24",
    turno: "Tarde",
    personas: 1,
  },
];

function main() {
  const { puerto, formatoRegistro } = leerConfiguracion();
  const servicioReservas = crearServicioReservas(reservasIniciales);
  const app = crearApp({ servicioReservas, formatoRegistro });

  app.listen(puerto, () => {
    console.log(`Aplicación disponible en http://localhost:${puerto}`);
  });
}

try {
  main();
} catch (error) {
  console.error("No se pudo iniciar la aplicación:", error.message);
  process.exitCode = 1;
}
