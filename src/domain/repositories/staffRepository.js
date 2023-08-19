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

  async getStaffByPosition(id_cargo) {
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

      const staffData = staffs.filter((staff) => staff.cargo_personals.some(
        (position) => position.cargo.id_cargo == id_cargo
      )).map((staff) => ({
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

  async filterStaff(filterData) {
    try {
      let whereCondition = {};

      const {
        id_cargo,
        id_facultad,
        id_oficina,
        search,
      } = filterData;

      const officeFilter = {};

      const positionFilter = {};
      let includePositionStaff = {
        model: PositionStaff,
        include: [Position],
        where: positionFilter,
        required: false,
      };

      const facultyFilter = {};
      let includeFacultyStaff = {
        model: FacultyStaff,
        include: [Faculty],
        where: facultyFilter,
        required: false,
      };

      if (id_oficina) {
        officeFilter.id_oficina = id_oficina;
      }

      if (id_cargo) {
        const position = await Position.findOne({
          where: { estado: 1, id_cargo: id_cargo },
        });

        if (position) {
          const staffsWithPosition = await PositionStaff.findAll({
            where: { id_cargo: id_cargo },
          });

          const staffsIds = staffsWithPosition.map(
            (item) => item.id_personal
          );
          positionFilter.id_personal = staffsIds;

          includePositionStaff = {
            model: PositionStaff,
            include: [Position],
            where: positionFilter,
            required: true,
          };
        }
      }

      if (id_facultad) {
        const faculty = await Faculty.findOne({
          where: { estado: 1, id_facultad: id_facultad },
        });

        if (faculty) {
          const staffsWithFaculty = await FacultyStaff.findAll({
            where: { id_facultad: id_facultad },
          });

          const staffsIds = staffsWithFaculty.map(
            (item) => item.id_personal
          );
          facultyFilter.id_personal = staffsIds;

          includeFacultyStaff = {
            model: FacultyStaff,
            include: [Faculty],
            where: facultyFilter,
            required: true,
          };
        }
      }

      if (search) {
        whereCondition = {
          estado: 1,
          [Op.or]: [
            { nombre: { [Op.like]: `%${search}%` } },
          ],
        };
      }

      const staffExists = await Staff.findAll({
        where: whereCondition,
        include: [
          {
            model: Office,
            where: officeFilter,
          },
          includeFacultyStaff,
          includePositionStaff,
        ],
        order: [["nombre", "ASC"]],
      });

      if (staffExists.count <= 0) { return false; }

      const staff = staffExists.map((staff) => ({
        id_personal: staff.id_personal,
        nombre: staff.nombre,
        oficina: `${staff.oficina.nombre_oficina} (${staff.oficina.iniciales})`,

        cargos: staff.cargo_personals
          .filter(
            (position) => position.cargo.estado == 1
          )
          .map(
            (position) => position.cargo.nombre_cargo
          ),
        
        facultades: staff.facultad_personals
          .filter((faculty) => faculty.facultade.estado == 1)
          .map((faculty) => `${faculty.facultade.nombre_facultad}`),
      }));

      return staff;
    } catch (error) {
      throw error;
    }
  }
}

export default staffRepository;
