import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileImage = (req, res) => {
  const { folder, img } = req.params;
  const allowedFolders = ['faculties', 'staff', 'offices'];

  if(!allowedFolders.includes(folder)) {
    return res.status(400).json({ error: 'Ruta de imagen no encontrada' });
  }

  const filePath = path.join(__dirname, `../../../src/infraestructure/storage/local/images/${folder}/${img}`);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: 'No se encontró el archivo' });
  } else {
    res.sendFile(filePath);
  }
};

export { fileImage };
