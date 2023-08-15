import { Op } from "sequelize";
import Staff from "../../infraestructure/models/staffModel.js";
import Office from "../../infraestructure/models/officeModel.js";
import FacultyStaff from "../../infraestructure/models/facultyStaffModel.js";
import Faculty from "../../infraestructure/models/facultyModel.js";
import PositionStaff from "../../infraestructure/models/positionStaffModel.js";
import Position from "../../infraestructure/models/positionModel.js";

class staffRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async getAllStaff() {
    try {
      const staffs = await Staff.findAll({
        where: { estado: 1 },
        include: [
          {
            model: Office,
          },
          {
            model: FacultyStaff,
            include: [Faculty],
          },
          {
            model: PositionStaff,
            include: [Position],
          },
        ],
        order: [["nombre", "ASC"]],
      });

      if (staffs.length <= 0) {
        return false;
      }

      const staffData = staffs.map((staff) => ({
        id_personal: staff.id_personal,
        nombre: staff.nombre,
        direccion: staff.direccion,
        correo: staff.correo,
        telefono: staff.telefono,
        perfil: staff.perfil,

        imagen: staff.imagen
          ? `${process.env.DOMAIN}/${process.env.DATA}/staff/${staff.imagen}`
          : null,

        oficina: staff.oficina.nombre_oficina,

        facultades: staff.facultad_personals
          .filter((faculty) => faculty.facultade.estado == 1)
          .map((faculty) => `${faculty.facultade.nombre_facultad}`),

        cargos: staff.cargo_personals
          .filter((position) => position.cargo.estado == 1)
          .map((position) => `${position.cargo.nombre_cargo}`),

        estado: staff.estado,
      }));

      return staffData;
    } catch (error) {
      throw error;
    }
  }

  async getStaffById(id_personal) {
    try {
      const staff = await Staff.findOne({
        where: { id_personal, estado: 1 },
        include: [
          {
            model: Office,
          },
          {
            model: FacultyStaff,
            include: [Faculty],
          },
          {
            model: PositionStaff,
            include: [Position],
          },
        ],
        order: [["nombre", "ASC"]],
      });

      if (!staff) {
        return false;
      }

      const staffData = {
        id_personal: staff.id_personal,
        nombre: staff.nombre,
        direccion: staff.direccion,
        correo: staff.correo,
        telefono: staff.telefono,
        perfil: staff.perfil,

        imagen: staff.imagen
          ? `${process.env.DOMAIN}/${process.env.DATA}/staff/${staff.imagen}`
          : null,

        oficina: staff.oficina.nombre_oficina,

        facultades: staff.facultad_personals
          .filter((faculty) => faculty.facultade.estado == 1)
          .map((faculty) => `${faculty.facultade.nombre_facultad}`),

        cargos: staff.cargo_personals
          .filter((position) => position.cargo.estado == 1)
          .map((position) => `${position.cargo.nombre_cargo}`),

        estado: staff.estado,
      };

      return staffData;
    } catch (error) {
      throw error;
    }
  }

  async getStaffGeneral(search) {
    try {
      const whereCondition = {
        estado: 1,
        nombre: { [Op.like]: `%${search}%` },
      };

      const staffs = await Staff.findAll({
        where: whereCondition,
        include: [
          {
            model: Office,
          },
          {
            model: FacultyStaff,
            include: [Faculty],
          },
          {
            model: PositionStaff,
            include: [Position],
          },
        ],
        order: [["nombre", "ASC"]],
      });

      if (staffs.length <= 0) {
        return false;
      }

      const staffData = staffs.map((staff) => ({
        id_personal: staff.id_personal,
        nombre: staff.nombre,
        direccion: staff.direccion,
        correo: staff.correo,
        telefono: staff.telefono,
        perfil: staff.perfil,

        imagen: staff.imagen
          ? `${process.env.DOMAIN}/${process.env.DATA}/staff/${staff.imagen}`
          : null,

        oficina: staff.oficina.nombre_oficina,

        facultades: staff.facultad_personals
          .filter((faculty) => faculty.facultade.estado == 1)
          .map((faculty) => `${faculty.facultade.nombre_facultad}`),

        cargos: staff.cargo_personals
          .filter((position) => position.cargo.estado == 1)
          .map((position) => `${position.cargo.nombre_cargo}`),

        estado: staff.estado,
      }));

      return staffData;
    } catch (error) {
      throw error;
    }
  }
}

export default staffRepository;
