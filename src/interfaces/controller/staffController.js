import StaffRepository from "../../domain/repositories/staffRepository.js";
import StaffService from "../../application/services/staffService.js";
import connection from "../../infraestructure/config/db.js";

const staffRepository = new StaffRepository(connection);
const staffService = new StaffService(staffRepository);

const getAllStaff = async (req, res) => {
  try {
    const staff = await staffService.getAllStaff();

    if (!staff || staff.length <= 0) {
      res.status(404).json({ error: "No se encontró personal" });
    } else {
      res.json(staff);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ocurrió un error en el servidor (Controller - getAllStaff)",
    });
  }
};

const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await staffService.getStaffById(id);

    if (staff) {
      res.json(staff);
    } else {
      res.status(404).json({ error: "Personal no encontrado por ID" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Ocurrió un error en el servidor (Controller - getStaffById)",
      });
  }
};

const getStaffGeneral = async (req, res) => {
  try {
    const { search } = req.params;
    const staff = await staffService.getStaffGeneral(search);

    if (staff) {
      res.json(staff);
    } else {
      res.status(404).json({ error: "No hay resultados" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "Ocurrió un error en el servidor (Controller - getStaffGeneral)",
      });
  }
};

export { getAllStaff, getStaffById, getStaffGeneral };
