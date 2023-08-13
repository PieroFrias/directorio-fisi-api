import Sequelize from 'sequelize';
import Faculty from './facultyModel.js';
import Staff from './staffModel.js';
import connection from '../config/db.js';

const FacultyStaff = connection.define('facultad_personal', {
  id_fac_per: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_facultad: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Faculty,
      key: 'id_facultad'
    }
  },
  id_personal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Staff,
      key: 'id_personal'
    }
  }
}, {
  tableName: 'facultad_personal',
});

FacultyStaff.belongsTo(Faculty, { foreignKey: 'id_facultad', targetKey: 'id_facultad' });
FacultyStaff.belongsTo(Staff, { foreignKey: 'id_personal', targetKey: 'id_personal' });

Faculty.belongsToMany(Staff, { through: FacultyStaff, foreignKey: 'id_facultad' });
Staff.belongsToMany(Faculty, { through: FacultyStaff, foreignKey: 'id_personal' });

export default FacultyStaff;
