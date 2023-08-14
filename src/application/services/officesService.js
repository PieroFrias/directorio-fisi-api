class officesService {
  constructor(officesRepository) {
    this.officesRepository = officesRepository;
  }

  async getAllOffices() {
    try {
      const offices = await this.officesRepository.getAllOffices();
      return offices;
    } catch (error) {
      throw new Error("Error al obtener las oficinas: " + error.message);
    }
  }

  async getOfficeById(id_oficina) {
    try {
      const office = await this.officesRepository.getOfficeById(id_oficina);
      return office;
    } catch (error) {
      throw new Error("Error al obtener la oficina por ID: " + error.message);
    }
  }

  async getOfficesGeneral(search) {
    try {
      const offices = await this.officesRepository.getOfficesGeneral(search);
      return offices;
    } catch (error) {
      throw error;
    }
  }
}

export default officesService;
