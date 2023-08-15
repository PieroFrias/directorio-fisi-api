class staffService {
    constructor(staffRepository) {
      this.staffRepository = staffRepository;
    }
  
    async getAllStaff() {
      try {
        const staff = await this.staffRepository.getAllStaff();
        return staff;
      } catch (error) {
        throw new Error("Error al obtener el personal: " + error.message);
      }
    }
  
    async getStaffById(id_personal) {
      try {
        const staff = await this.staffRepository.getStaffById(
          id_personal
        );
        return staff;
      } catch (error) {
        throw new Error("Error al obtener el personal por ID: " + error.message);
      }
    }
  
    async getStaffGeneral(search) {
      try {
        const staff = await this.staffRepository.getStaffGeneral(search);
        return staff;
      } catch (error) {
        throw error;
      }
    }
  }
  
  export default staffService;
  