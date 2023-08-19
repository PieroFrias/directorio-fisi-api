import Sequelize from "sequelize";
import connection from "../config/db.js";

const Faculty = connection.define(
  "facultades",
  {
    id_facultad: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_facultad: {
      type: Sequelize.STRING(250),
      allowNull: false,
      reqquired: true,
      unique: true,
    },
    iniciales: {
      type: Sequelize.STRING(250),
      allowNull: false,
      required: true,
      unique: true,
    },
    descripcion: {
      type: Sequelize.TEXT,
      required: true,
      allowNull: false,
    },
    logo: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },
    estado: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  },
  {
    tableName: "facultades",
  }
);

import('./imgFacultyModel.js').then((ImgFaculty) => {
  Faculty.hasMany(ImgFaculty.default, { foreignKey: 'id_facultad' });
});

import('./officeModel.js').then((Office) => {
  Faculty.hasMany(Office.default, { foreignKey: 'id_facultad' });
});

import('./facultyStaffModel.js').then((FacultyStaff) => {
  Faculty.hasMany(FacultyStaff.default, { foreignKey: 'id_facultad' });
});

export default Faculty;
