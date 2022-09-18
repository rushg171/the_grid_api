const { productCon } = require('../controllers/product');
const express = require('express');
const proRouter = express.Router();

proRouter.route('/').all(productCon.view);
proRouter.route('/new').all(productCon.new);
proRouter.route('/update').all(productCon.update);
proRouter.route('/delete').all(productCon.del);

module.exports = { proRouter };
