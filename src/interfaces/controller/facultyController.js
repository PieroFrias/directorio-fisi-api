import FacultiesRepository from "../../domain/repositories/facultiesRepository.js";
import FacultiesService from "../../application/services/facultiesService.js";
import connection from "../../infraestructure/config/db.js";

const facultiesRepository = new FacultiesRepository(connection);
const facultiesService = new FacultiesService(facultiesRepository);

const getAllFaculties = async (req, res) => {
  try {
    const faculties = await facultiesService.getAllFaculties();

    if (!faculties || faculties.length <= 0) {
      res.status(404).json({ error: "No se encontraron facultades" });
    } else {
      res.json(faculties);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ocurrió un error en el servidor (Controller - getAllFaculties)",
    });
  }
};

const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await facultiesService.getFacultyById(id);

    if (faculty) {
      res.json(faculty);
    } else {
      res.status(404).json({ error: "Facultad no encontrada por ID" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Ocurrió un error en el servidor (Controller - getFacultyById)",
      });
  }
};

const getFacultiesGeneral = async (req, res) => {
  try {
    const { search } = req.params;
    const faculties = await facultiesService.getFacultiesGeneral(search);

    if (faculties) {
      res.json(faculties);
    } else {
      res.status(404).json({ error: "No hay resultados" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "Ocurrió un error en el servidor (Controller - getFacultiesGeneral)",
      });
  }
};

export { getAllFaculties, getFacultyById, getFacultiesGeneral };
