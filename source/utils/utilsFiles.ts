import * as path from 'path';
import { Express } from 'express';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as sharp from 'sharp';
export const imageFileFilter = (req, file, callback) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return callback(new Error('Only image files are allowed!'), false);
	}
	return callback(null, true);
};

export const editFileName = async (
	prefix: string,
	file: Express.Multer.File,
	verificarSiexisteDB: (filename: string) => any
) => {
	const name = file.originalname.split('.')[0];
	const fileExtName = '.jpg';
	const randomName = uuid();
	const filename = `${prefix}${name}-${randomName}${fileExtName}`;
	const validar = await verificarSiexisteDB(filename);
	if (validar) {
		editFileName(prefix, file, verificarSiexisteDB);
	} else return filename;
};

export const storageImage = () =>
	diskStorage({
		destination: './public/upload',
		filename: (req, file, cb) => cb(null, file.originalname),
	});

export const moveFile = async function (oldPath: string, newPath: string) {
	const staticFiles = path.join(__dirname, '../../public/upload/');
	newPath = path.join(staticFiles, newPath);
	await sharp(path.join(staticFiles, oldPath))
		.resize(600)
		.flatten({ background: '#fff' })
		.toFormat('jpg')
		.jpeg({ quality: 80 })
		.toFile(newPath);
	deleteFile(oldPath);
};

export const deleteFile = (pathDelete: string) => {
	const staticFiles = path.join(__dirname, '../../public/upload/');
	pathDelete = path.join(staticFiles, pathDelete);
	if (fs.existsSync(pathDelete)) fs.unlink(pathDelete, () => {});
};
