// Las mismas opciones y reglas del TP 05.
const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de salas";
  next();
}

function validarReserva(req, res, next) {
  // Corrección de la semana 6: si el POST no tiene cuerpo, responde 400 y no 500.
  const valores = req.body ?? {};
  const estudiante = String(valores.estudiante ?? "").trim();
  const email = String(valores.email ?? "").trim();
  const sala = String(valores.sala ?? "").trim();
  const fecha = String(valores.fecha ?? "").trim();
  const turno = String(valores.turno ?? "").trim();
  const personas = Number(valores.personas);

  const datosInvalidos =
    !estudiante ||
    !email ||
    !sala ||
    !fecha ||
    !turno ||
    !salasPermitidas.includes(sala) ||
    !turnosPermitidos.includes(turno) ||
    !email.includes("@") ||
    !Number.isInteger(personas) ||
    personas < 1 ||
    personas > 6;

  if (datosInvalidos) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: "Completá todos los campos con valores válidos.",
      valores,
    });
  }

  req.reservaValidada = {
    estudiante,
    email,
    sala,
    fecha,
    turno,
    personas,
  };
  next();
}

module.exports = { prepararAreaReservas, validarReserva };
