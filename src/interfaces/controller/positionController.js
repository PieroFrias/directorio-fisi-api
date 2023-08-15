import PositionRepository from "../../domain/repositories/positionRepository.js";
import PositionService from "../../application/services/positionService.js";
import connection from "../../infraestructure/config/db.js";

const positionRepository = new PositionRepository(connection);
const positionService = new PositionService(positionRepository);

const getAllPosition = async (req, res) => {
  try {
    const position = await positionService.getAllPosition();

    if (!position || position.length <= 0) {
      res.status(404).json({ error: "No se encontraron cargos" });
    } else {
      res.json(position);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ocurrió un error en el servidor (Controller - getAllPosition)",
    });
  }
};

export { getAllPosition };
