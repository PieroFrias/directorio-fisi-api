import Sequelize from 'sequelize';
import Position from './positionModel.js';
import Staff from './staffModel.js';
import connection from '../config/db.js';

const PositionStaff = connection.define('cargo_personal', {
  id_cargo_per: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cargo: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Position,
      key: 'id_cargo'
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
  tableName: 'cargo_personal',
});

PositionStaff.belongsTo(Position, { foreignKey: 'id_cargo', targetKey: 'id_cargo' });
PositionStaff.belongsTo(Staff, { foreignKey: 'id_personal', targetKey: 'id_personal' });

Position.belongsToMany(Staff, { through: PositionStaff, foreignKey: 'id_cargo' });
Staff.belongsToMany(Position, { through: PositionStaff, foreignKey: 'id_personal' });

export default PositionStaff;
