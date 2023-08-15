import Sequelize from "sequelize";
import connection from "../config/db.js";

const Position = connection.define(
  "cargos",
  {
    id_cargo: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_cargo: {
      type: Sequelize.STRING(250),
      allowNull: false,
      unique: true,
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: "cargos",
  }
);

import("./positionStaffModel.js").then((PositionStaff) => {
  Position.hasMany(PositionStaff.default, { foreignKey: "id_cargo" });
});

export default Position;
