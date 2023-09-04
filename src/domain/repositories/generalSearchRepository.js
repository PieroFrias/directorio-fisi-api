import facultiesRepository from "./facultiesRepository.js";
import staffRepository from "./staffRepository.js";
import officesRepository from "./officesRepository.js";
import connection from "../../infraestructure/config/db.js";

class generalSearchRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async generalSearch(search) {
    try {
      const faculties = await this.searchFaculties(search);
      const staff = await this.searchStaff(search);
      const office = await this.searchPueblosIndigenas(search);

      const array = [];
      const result = array.concat(faculties, staff, office);

      if (result.length <= 0) { return false; }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async searchFaculties(search) {
    const faculties = new facultiesRepository(connection);
    return await faculties.getFacultiesGeneral(search);
  }

  async searchStaff(search) {
    const staff = new staffRepository(connection);
    return await staff.getStaffGeneral(search);
  }

  async searchPueblosIndigenas(search) {
    const offices = new officesRepository(connection);
    return await offices.getOfficesGeneral(search);
  }
}

export default generalSearchRepository;
