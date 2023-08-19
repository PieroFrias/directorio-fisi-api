import { Op } from "sequelize";
import Faculty from "../../infraestructure/models/facultyModel.js";
import Office from "../../infraestructure/models/officeModel.js";
import FacultyStaff from "../../infraestructure/models/facultyStaffModel.js";
import Staff from "../../infraestructure/models/staffModel.js";
import ImgFaculty from "../../infraestructure/models/imgFacultyModel.js";

class facultiesRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async getAllFaculties() {
    try {
      const faculties = await Faculty.findAll({
        where: { estado: 1 },
        include: [
          {
            model: Office,
          },
          {
            model: FacultyStaff,
            include: [Staff],
          },
          {
            model: ImgFaculty,
          },
        ],
        order: [["nombre_facultad", "ASC"]],
      });

      if (faculties.length <= 0) {
        return false;
      }

      const facultiesData = faculties.map((faculty) => ({
        id_facultad: faculty.id_facultad,
        nombre_facultad: faculty.nombre_facultad,
        iniciales: faculty.iniciales,
        descripcion: faculty.descripcion,

        logo: faculty.logo
          ? `${process.env.DOMAIN}/${process.env.DATA}/faculties/${faculty.logo}`
          : null,

        oficinas: faculty.oficinas
          .filter((office) => office.estado == 1)
          .map((office) => `${office.nombre_oficina} (${office.iniciales})`),

        personal: faculty.facultad_personals
          .filter((staff) => staff.personal.estado == 1)
          .map((staff) => `${staff.personal.nombre}`),

        imagenes: faculty.img_facultads
          .filter((img) => img.estado == 1)
          .map(
            (img) =>
              `${process.env.DOMAIN}/${process.env.DATA}/faculties/${img.imagen}`
          ),

        estado: faculty.estado,
      }));

      return facultiesData;
    } catch (error) {
      throw error;
    }
  }

  async getFacultyById(id_facultad) {
    try {
      const faculty = await Faculty.findOne({
        where: { id_facultad, estado: 1 },
        include: [
          {
            model: Office,
          },
          {
            model: FacultyStaff,
            include: [Staff],
          },
          {
            model: ImgFaculty,
          },
        ],
        order: [["nombre_facultad", "ASC"]],
      });

      if (!faculty) {
        return false;
      }

      const facultyData = {
        id_facultad: faculty.id_facultad,
        nombre_facultad: faculty.nombre_facultad,
        iniciales: faculty.iniciales,
        descripcion: faculty.descripcion,

        logo: faculty.logo
          ? `${process.env.DOMAIN}/${process.env.DATA}/faculties/${faculty.logo}`
          : null,

        oficinas: faculty.oficinas
          .filter((office) => office.estado == 1)
          .map((office) => `${office.nombre_oficina} (${office.iniciales})`),

        personal: faculty.facultad_personals
          .filter((staff) => staff.personal.estado == 1)
          .map((staff) => `${staff.personal.nombre}`),

        imagenes: faculty.img_facultads
          .filter((img) => img.estado == 1)
          .map(
            (img) =>
              `${process.env.DOMAIN}/${process.env.DATA}/faculties/${img.imagen}`
          ),

        estado: faculty.estado,
      };

      return facultyData;
    } catch (error) {
      throw error;
    }
  }

  async getFacultiesGeneral(search) {
    try {
      const whereCondition = {
        estado: 1,
        [Op.or]: [
          { nombre_facultad: { [Op.like]: `%${search}%` } },
          { iniciales: { [Op.like]: `%${search}%` } },
        ],
      };

      const faculties = await Faculty.findAll({
        where: whereCondition,
        include: [
          {
            model: Office,
          },
          {
            model: FacultyStaff,
            include: [Staff],
          },
          {
            model: ImgFaculty,
          },
        ],
        order: [["nombre_facultad", "ASC"]],
      });

      if (faculties.length <= 0) {
        return false;
      }

      const facultiesData = faculties.map((faculty) => ({
        id_facultad: faculty.id_facultad,
        nombre_facultad: faculty.nombre_facultad,
        iniciales: faculty.iniciales,
        descripcion: faculty.descripcion,

        logo: faculty.logo
          ? `${process.env.DOMAIN}/${process.env.DATA}/faculties/${faculty.logo}`
          : null,

        oficinas: faculty.oficinas
          .filter((office) => office.estado == 1)
          .map((office) => `${office.nombre_oficina} (${office.iniciales})`),

        personal: faculty.facultad_personals
          .filter((staff) => staff.personal.estado == 1)
          .map((staff) => `${staff.personal.nombre}`),

        imagenes: faculty.img_facultads
          .filter((img) => img.estado == 1)
          .map(
            (img) =>
              `${process.env.DOMAIN}/${process.env.DATA}/faculties/${img.imagen}`
          ),

        estado: faculty.estado,
      }));

      return facultiesData;
    } catch (error) {
      throw error;
    }
  }

  async filterFaculties(filterData) {
    try {
      let whereCondition = {};

      const { id_oficina, search, } = filterData;

      const officeFilter = {};
      if (id_oficina) {
        officeFilter.id_oficina = id_oficina;
      }

      if (search) {
        whereCondition = {
          estado: 1,
          [Op.or]: [
            { nombre_facultad: { [Op.like]: `%${search}%` } },
            { iniciales: { [Op.like]: `%${search}%` } },
          ],
        };
      }

      const faculties = await Faculty.findAll({
        where: whereCondition,
        include: [
          {
            model: Office,
            where: officeFilter,
          },
          {
            model: FacultyStaff,
            include: [Staff],
          },
          {
            model: ImgFaculty,
          },
        ],
        order: [["nombre_facultad", "ASC"]],
      });

      if (faculties.count <= 0) { return false; }

      const facultiesData = faculties.map((faculty) => ({
        id_facultad: faculty.id_facultad,
        nombre_facultad: faculty.nombre_facultad,
        iniciales: faculty.iniciales,
        descripcion: faculty.descripcion,

        logo: faculty.logo
          ? `${process.env.DOMAIN}/${process.env.DATA}/faculties/${faculty.logo}`
          : null,

        oficinas: faculty.oficinas
          .filter((office) => office.estado == 1)
          .map((office) => `${office.nombre_oficina} (${office.iniciales})`),

        personal: faculty.facultad_personals
          .filter((staff) => staff.personal.estado == 1)
          .map((staff) => `${staff.personal.nombre}`),

        imagenes: faculty.img_facultads
          .filter((img) => img.estado == 1)
          .map(
            (img) =>
              `${process.env.DOMAIN}/${process.env.DATA}/faculties/${img.imagen}`
          ),

        estado: faculty.estado,
      }));

      return facultiesData;
    } catch (error) {
      throw error;
    }
  }
}

export default facultiesRepository;
