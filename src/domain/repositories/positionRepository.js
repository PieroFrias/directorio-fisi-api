import Position from "../../infraestructure/models/positionModel.js";

class positionRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async getAllPosition() {
    try {
      const positions = await Position.findAll({
        where: { estado: 1 },
        order: [["nombre_cargo", "ASC"]],
      });

      if (positions.length <= 0) {
        return false;
      }

      const positionData = positions.map((position) => ({
        id_cargo: position.id_cargo,
        nombre_cargo: position.nombre_cargo,
      }));

      return positionData;
    } catch (error) {
      throw error;
    }
  }
}

export default positionRepository;
