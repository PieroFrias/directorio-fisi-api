import Sequelize from 'sequelize';
import Faculty from './facultyModel.js';
import connection from '../config/db.js';

const ImgFaculty = connection.define('img_facultad', {
  id_img_fac: {
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
  imagen: {
    type: Sequelize.STRING(250),
    allowNull: true,
  },
  estado: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 1
  }
}, {
  tableName: 'img_facultad',
});

ImgFaculty.belongsTo(Faculty, { foreignKey: 'id_facultad', targetKey: 'id_facultad' });

export default ImgFaculty;
