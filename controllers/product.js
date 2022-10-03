const { nanoid } = require('nanoid');
const { knex } = require('../connector');
const Product = require('../models/Product');

const baseImageUrl = 'https://api-the-grid.herokuapp.com/products/imgs/';
const productTable = 'product';
const productColumns = {
  id: 'product_id',
  name: 'product_name',
  shortDesc: 'product_short_description',
  fullDesc: 'product_description',
  imageUrl: 'product_main_image_url',
  pCategory: 'product_category',
};
const pDynAttrTable = 'product_dynamic_attributes';
const pDynAttrColumns = {
  id: 'product_dynamic_attributes_id',
  productId: 'product_id',
  dSecId: 'd_section_id',
  dAttrId: 'd_attribute_id',
  dAttrKey: 'd_attribute_key',
  dAttrValue: 'd_attribute_value',
};
const secTable = 'dynamic_section';
const secColumns = {
  id: 'd_section_id',
  name: 'd_section_name',
  description: 'd_section_description',
};

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push(obj);
    return acc;
  }, {});
}

const productCon = {
  fetchAll: async (req, res, next) => {
    const collection = await Product.query();
    return res.json(collection);
  },
  view: async (req, res) => {
    await knex({ product: productTable })
      .select(productColumns)
      .then((products) => {
        return res.json(products);
      })
      .catch((err) => {
        console.error(err);
        return res.json({
          success: false,
          message: 'An error occurred, please try again in some time',
        });
      });
  },

  fileTest: async (req, res) => {
    const imageName = req.file.filename;
    console.log(imageName);
    res.json({ image: imageName });
  },

  fetchOne: async (req, res, next) => {
    productId = await req.query.productId;
    console.log(productId);

    const genDetails = await knex({ product: productTable })
      .where(productColumns.id, productId)
      .select(productColumns)
      .catch((err) => {
        console.error(err);
        return res.json({
          success: false,
          message: 'An error occurred, please try again in some time',
        });
      });
    const secDetails = await knex
      .select(
        secColumns.name,
        pDynAttrColumns.dAttrKey,
        pDynAttrColumns.dAttrValue
      )
      .from({ pda: pDynAttrTable })
      .leftJoin({ ds: secTable }, 'pda.d_section_id', 'ds.d_section_id')
      .where(pDynAttrColumns.productId, productId)
      .catch((err) => {
        console.error(err);
        return res.json({
          success: false,
          message: 'An error occurred, please try again in some time',
        });
      });

    return res.json({
      genDetails: genDetails,
      secDetails: groupBy(secDetails, secColumns.name),
    });
  },
  insertOne: async (req, res, next) => {
    if (!req.body.product_name) {
      return res.json({
        success: false,
        message: 'Name is required!',
      });
    }
    const result = await Product.query().insert({
      product_id: nanoid(10),
      product_name: req.body.product_name,
      product_short_description: req.body.product_short_description,
      product_description: req.body.product_description,
      product_main_image_url: req.file.filename ? req.file.filename : '',
      product_category: req.body.product_category,
    });
    console.log(req.file.filename);
    return res.json(result);
  },

  new: async (req, res) => {
    const name = req.body.name ? req.body.name : '';
    const shortDescription = req.body.shortDescription
      ? req.body.shortDescription
      : '';
    const description = req.body.description ? req.body.description : '';
    const category = req.body.category;
    if (!name)
      return res.json({
        success: false,
        message: 'Name is required!',
      });
    knex(productTable)
      .insert({
        product_id: nanoid(10),
        [productColumns.name]: name,
        [productColumns.shortDesc]: shortDescription,
        [productColumns.fullDesc]: description,
        // [productColumns.imageUrl]: baseImageUrl + req.file.filename,
        [productColumns.pCategory]: category,
      })
      .then((id) => {
        return res.json({ success: true, message: 'Added product:' + name });
      })
      .catch((err) => {
        console.error(err);
        return res.json({
          success: false,
          message: 'An error occurred, please try again in some time',
        });
      });
  },

  update: async (req, res) => {
    const id = req.body.id ? req.body.id : '';
    const name = req.body.name ? req.body.name : '';
    const shortDescription = req.body.shortDescription
      ? req.body.shortDescription
      : '';
    const description = req.body.description ? req.body.description : '';
    const category = req.body.category;
    if (!id)
      return res.json({
        success: false,
        message: 'Incorrect product!',
      });
    if (!name)
      return res.json({
        success: false,
        message: 'Name is required!',
      });

    knex({ productTable })
      .where({
        [productColumns.id]: id,
      })
      .update({
        [productColumns.name]: name,
        [productColumns.description]: description,
        [productColumns.name]: name,
        [productColumns.shortDesc]: shortDescription,
        [productColumns.fullDesc]: description,
        [productColumns.imageUrl]: baseImageUrl + req.file.filename,
        [productColumns.pCategory]: category,
      })
      .then((result) => {
        console.log(result);
        if (result)
          return res.json({
            success: true,
            message: 'Updated product:' + name,
          });
      })
      .catch((err) => {
        console.error(err);
        return res.json({
          success: false,
          message: 'An error occurred, please try again in some time',
        });
      });
  },

  del: async (req, res) => {
    const id = req.body.id;
    if (!id)
      return res.json({
        success: false,
        message: 'Incorrect product!',
      });

    knex(productTable)
      .where(productColumns.id, id)
      .del()
      .then((deleted) => {
        if (deleted)
          return res.json({
            success: true,
            message: 'Deleted product: ID:' + id,
          });
        else {
          return res.json({
            success: false,
            message: 'An error occurred',
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return res.json({
          success: false,
          message: 'An error occurred, please try again in some time',
        });
      });
  },
};

module.exports = { productCon };
