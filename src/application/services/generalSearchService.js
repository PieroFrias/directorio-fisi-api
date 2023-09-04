class generalSearchService {
  constructor(generalSearchRepository) {
    this.generalSearchRepository = generalSearchRepository;
  }

  async generalSearch(search) {
    try {
      const results = await this.generalSearchRepository.generalSearch(search);
      return results;
    } catch (error) {
      throw error;
    }
  }
}

export default generalSearchService;