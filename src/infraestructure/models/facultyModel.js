import Sequelize from "sequelize";
import connection from "../config/db";

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
    // Otras opciones del modelo
  }
);

import('./imgFacultyModel').then((ImgFaculty) => {
  Faculty.hasMany(ImgFaculty.default, { foreignKey: 'id_facultad' });
});

import('./officeModel').then((Office) => {
  Faculty.hasMany(Office.default, { foreignKey: 'id_facultad' });
});

import('./facultyStaffModel').then((FacultyStaff) => {
  Faculty.hasMany(FacultyStaff.default, { foreignKey: 'id_facultad' });
});

export default Faculty;
