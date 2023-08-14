class facultiesService {
  constructor(facultiesRepository) {
    this.facultiesRepository = facultiesRepository;
  }

  async getAllFaculties() {
    try {
      const faculties = await this.facultiesRepository.getAllFaculties();
      return faculties;
    } catch (error) {
      throw new Error("Error al obtener las facultades: " + error.message);
    }
  }

  async getFacultyById(id_facultad) {
    try {
      const faculty = await this.facultiesRepository.getFacultyById(
        id_facultad
      );
      return faculty;
    } catch (error) {
      throw new Error("Error al obtener la facultad por ID: " + error.message);
    }
  }

  async getFacultiesGeneral(search) {
    try {
      const faculties = await this.facultiesRepository.getFacultiesGeneral(search);
      return faculties;
    } catch (error) {
      throw error;
    }
  }
}

export default facultiesService;
