const { productCon } = require('../controllers/product');
const express = require('express');
const multer = require('multer');
const path = require('path');
const mime = require('mime');
const proRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('E:/Projects/the_grid_api/public/imgs'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        '-' +
        uniqueSuffix +
        '.' +
        mime.getExtension(file.mimetype)
    );
  },
});

const upload = multer({ storage: storage });

proRouter.route('/test').post(upload.single('cover'), productCon.fileTest);

proRouter.route('/').all(productCon.view);
proRouter.route('/fetchOne').get(productCon.fetchOne);
proRouter.route('/new').all(upload.single('cover'), productCon.new);
proRouter.route('/update').all(upload.single('cover'), productCon.update);
proRouter.route('/delete').all(productCon.del);

module.exports = { proRouter };
