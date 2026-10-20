// El controlador adapta las operaciones del servicio a respuestas HTTP.
function crearControladorReservas(servicioReservas) {
  function mostrarInicio(req, res) {
    res.render("inicio", { titulo: "Reservas de salas de estudio" });
  }

  function mostrarEstado(req, res) {
    res.json({
      servicio: "activo",
      reservas: servicioReservas.contarReservas(),
      solicitudId: res.locals.solicitudId,
    });
  }

  function listar(req, res) {
    res.render("reservas/lista", {
      titulo: "Reservas",
      reservas: servicioReservas.listarReservas(),
    });
  }

  function mostrarFormulario(req, res) {
    res.render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: null,
      valores: {},
    });
  }

  function mostrarDetalle(req, res) {
    const id = Number(req.params.id);
    const reserva = servicioReservas.buscarReservaPorId(id);

    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "Reserva no encontrada",
        mensaje: "No existe una reserva con ese identificador.",
      });
    }

    res.render("reservas/detalle", { titulo: "Detalle de reserva", reserva });
  }

  function crear(req, res) {
    servicioReservas.crearReserva(req.reservaValidada);
    res.redirect("/reservas");
  }

  return {
    mostrarInicio,
    mostrarEstado,
    listar,
    mostrarFormulario,
    mostrarDetalle,
    crear,
  };
}

module.exports = { crearControladorReservas };
