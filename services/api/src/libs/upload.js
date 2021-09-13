const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
	destination(_, __, cb) {
		cb(null, path.resolve(__dirname, '../public/uploads'))
	},
	filename(_, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`.split(' ').join('_'))
	} 
})

const fileFilter = (_, file, cb) => {
	const mimetypes = [ 'image/png', 'image/jpeg', 'image/webp' ]
	if (mimetypes.indexOf(file.mimetype) !== -1 ) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const limits = {
	fileSize: 1024 * 1024 * 5
}

module.exports = multer({ storage, fileFilter, limits })