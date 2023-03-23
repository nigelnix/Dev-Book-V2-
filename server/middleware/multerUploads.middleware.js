import multer from 'multer';
const storageOptions = {
    destination: './uploads/images',
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`);
    },
};
const storage = multer.diskStorage(storageOptions);
const options = {
    storage,
    limits: { fieldSize: 50 * 1024 * 1024 },
};
const fields = [
    { name: 'userPic', maxCount: 1 },
    { name: 'userBanner', maxCount: 1 },
];
const profileUploads = multer(options).fields(fields);
const postUploads = multer(options).single('image');
export { profileUploads, postUploads };
