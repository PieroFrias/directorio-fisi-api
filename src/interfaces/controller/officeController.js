import OfficesRepository from "../../domain/repositories/officesRepository.js";
import OfficesService from "../../application/services/officesService.js";
import connection from "../../infraestructure/config/db.js";

const officesRepository = new OfficesRepository(connection);
const officesService = new OfficesService(officesRepository);

const getAllOffices = async (req, res) => {
  try {
    const offices = await officesService.getAllOffices();

    if (!offices || offices.length <= 0) {
      res.status(404).json({ error: "No se encontraron oficinas" });
    } else {
      res.json(offices);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ocurrió un error en el servidor (Controller - getAllOffices)",
    });
  }
};

const getOfficeById = async (req, res) => {
  try {
    const { id } = req.params;
    const office = await officesService.getOfficeById(id);

    if (office) {
      res.json(office);
    } else {
      res.status(404).json({ error: "Oficina no encontrada por ID" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Ocurrió un error en el servidor (Controller - getOfficeById)",
      });
  }
};

const getOfficesGeneral = async (req, res) => {
  try {
    const { search } = req.params;
    const offices = await officesService.getOfficesGeneral(search);

    if (offices) {
      res.json(offices);
    } else {
      res.status(404).json({ error: "No hay resultados" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "Ocurrió un error en el servidor (Controller - getOfficesGeneral)",
      });
  }
};

export { getAllOffices, getOfficeById, getOfficesGeneral };
