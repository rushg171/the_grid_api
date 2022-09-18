const { knex } = require('../connector');

const productTable = 'product';
const productColumns = {
  id: 'product_id',
  name: 'product_name',
  description: 'description',
  imagePath: 'product_image_path',
};

const productCon = {
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

  new: async (req, res) => {
    const name = req.body.name ? req.body.name : '';
    const description = req.body.description ? req.body.description : '';
    if (!name)
      return res.json({
        success: false,
        message: 'Name is required!',
      });
    knex(productTable)
      .insert({
        [productColumns.name]: name,
        [productColumns.description]: description,
        [productColumns.imagePath]: '/imagePath',
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
    const description = req.body.description ? req.body.description : '';
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
