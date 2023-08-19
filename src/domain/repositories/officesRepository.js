import { Op } from "sequelize";
import Office from "../../infraestructure/models/officeModel.js";
import Faculty from "../../infraestructure/models/facultyModel.js";
import Staff from "../../infraestructure/models/staffModel.js";

class officesRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async getAllOffices() {
    try {
      const offices = await Office.findAll({
        where: { estado: 1 },
        include: [Faculty, Staff],
        order: [["nombre_oficina", "ASC"]],
      });

      if (offices.length <= 0) {
        return false;
      }

      const officesData = offices.map((office) => ({
        id_oficina: office.id_oficina,
        nombre_oficina: office.nombre_oficina,
        iniciales: office.iniciales,
        descripcion: office.descripcion,
        correo: office.correo,
        telefono: office.telefono,
        facultad: office.facultade.nombre_facultad,

        imagen: office.imagen
          ? `${process.env.DOMAIN}/${process.env.DATA}/offices/${office.imagen}`
          : null,

        personal: office.personals
          .filter((staff) => staff.estado == 1)
          .map((staff) => `${staff.nombre}`),

        estado: office.estado,
      }));

      return officesData;
    } catch (error) {
      throw error;
    }
  }

  async getOfficeById(id_oficina) {
    try {
      const office = await Office.findOne({
        where: { id_oficina, estado: 1 },
        include: [Faculty, Staff],
        order: [["nombre_oficina", "ASC"]],
      });

      if (!office) {
        return false;
      }

      const officeData = {
        id_oficina: office.id_oficina,
        nombre_oficina: office.nombre_oficina,
        iniciales: office.iniciales,
        descripcion: office.descripcion,
        correo: office.correo,
        telefono: office.telefono,
        facultad: office.facultade.nombre_facultad,

        imagen: office.imagen
          ? `${process.env.DOMAIN}/${process.env.DATA}/offices/${office.imagen}`
          : null,

        personal: office.personals
          .filter((staff) => staff.estado == 1)
          .map((staff) => `${staff.nombre}`),

        estado: office.estado,
      };

      return officeData;
    } catch (error) {
      throw error;
    }
  }

  async getOfficesGeneral(search) {
    try {
      const whereCondition = {
        estado: 1,
        [Op.or]: [
          { nombre_oficina: { [Op.like]: `%${search}%` } },
          { iniciales: { [Op.like]: `%${search}%` } },
        ],
      };

      const offices = await Office.findAll({
        where: whereCondition,
        include: [Faculty, Staff],
        order: [["nombre_oficina", "ASC"]],
      });

      if (offices.length <= 0) {
        return false;
      }

      const officesData = offices.map((office) => ({
        id_oficina: office.id_oficina,
        nombre_oficina: office.nombre_oficina,
        iniciales: office.iniciales,
        descripcion: office.descripcion,
        correo: office.correo,
        telefono: office.telefono,
        facultad: office.facultade.nombre_facultad,

        imagen: office.imagen
          ? `${process.env.DOMAIN}/${process.env.DATA}/offices/${office.imagen}`
          : null,

        personal: office.personals
          .filter((staff) => staff.estado == 1)
          .map((staff) => `${staff.nombre}`),

        estado: office.estado,
      }));

      return officesData;
    } catch (error) {
      throw error;
    }
  }
}

export default officesRepository;
