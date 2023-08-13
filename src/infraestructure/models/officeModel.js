import Sequelize from "sequelize";
import connection from "../config/dataBase.js";
import Faculty from "./facultyModel.js";

const Office = connection.define("oficinas", {
  id_oficina: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_oficina: {
    type: Sequelize.STRING(250),
    allowNull: false,
    unique: true,
  },
  iniciales: {
    type: Sequelize.STRING(250),
    allowNull: false,
    unique: true,
  },
  correo: {
    type: Sequelize.STRING(250),
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: Sequelize.STRING(9),
    allowNull: false,
    unique: true,
  },
  descripcion: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  id_facultad: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Faculty,
      key: "id_facultad",
    },
  },
  imagen: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  estado: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
});

Office.belongsTo(Faculty, { foreignKey: "id_facultad", targetKey: "id_facultad" });

import('./staffModel.js').then((Staff) => {
  Office.hasMany(Staff.default, { foreignKey: 'id_oficina' });
});

export default Office;
