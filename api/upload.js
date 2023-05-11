const multer = require('multer');

//check the file type if its image
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    cb(null, false);
}

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter
});
//limits to 2mb

module.exports = upload;