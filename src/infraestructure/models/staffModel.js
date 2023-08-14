import Sequelize from "sequelize";
import Office from "./officeModel.js";
import connection from "../config/db.js";

const Staff = connection.define(
  "personal",
  {
    id_personal: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING(250),
      allowNull: false,
      unique: true,
    },
    direccion: {
      type: Sequelize.STRING(250),
      allowNull: true,
    },
    correo: {
      type: Sequelize.TEXT(250),
      allowNull: true,
      unique: true,
    },
    telefono: {
      type: Sequelize.STRING(9),
      allowNull: false,
      unique: true,
    },
    perfil: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    cargo: {
      type: Sequelize.STRING(250),
      allowNull: true,
    },
    tipo_personal: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_oficina: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Office,
        key: "id_oficina",
      },
    },
    imagen: {
      type: Sequelize.STRING(250),
      allowNull: true,
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: "personal",
  }
);

Staff.belongsTo(Office, { foreignKey: "id_oficina", targetKey: "id_oficina" });

import("./facultyStaffModel.js").then((FacultyStaff) => {
  Staff.hasMany(FacultyStaff.default, { foreignKey: "id_personal" });
});

export default Staff;
