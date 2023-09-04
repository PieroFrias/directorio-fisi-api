import GeneralSearchRepository from "../../domain/repositories/generalSearchRepository.js";
import GeneralSearchService from "../../application/services/generalSearchService.js";
import connection from "../../infraestructure/config/db.js";

const generalSearchRepository = new GeneralSearchRepository(connection);

const generalSearchService = new GeneralSearchService(generalSearchRepository);

const generalSearch = async (req, res) => {
  try {
    const { search } = req.params;
    const results = await generalSearchService.generalSearch(search);

    if (results) {
      res.json(results);
    } else {
      res.status(404).json({ error: "No hay registros"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error en el servidor al buscar (controller - generalSearch)" });
  }
};

export {
  generalSearch
};