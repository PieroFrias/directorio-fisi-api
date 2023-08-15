class positionService {
    constructor(positionRepository) {
      this.positionRepository = positionRepository;
    }
  
    async getAllPosition() {
      try {
        const position = await this.positionRepository.getAllPosition();
        return position;
      } catch (error) {
        throw new Error("Error al obtener los cargos: " + error.message);
      }
    }
  }
  
  export default positionService;
  