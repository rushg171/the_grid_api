const { Model } = require('objection');
const { knex } = require('../connector');

Model.knex(knex);

class Product extends Model {
  static get tableName() {
    return 'product';
  }

  static get idColumn() {
    return 'product_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['product_name'],

      properties: {
        product_id: { type: 'string' },
        product_name: { type: 'string' },
        product_short_description: { type: 'string' },
        product_description: { type: 'string' },
        product_main_image_url: { type: 'string' },
        product_category: { type: 'string' },
      },
    };
  }
  static get relationMappings() {
    const Product_dynamic_attributes = require('./Product_dynamic_attributes');

    return {
      specifications: {
        relation: Model.HasManyRelation,
        modelClass: Product_dynamic_attributes,
        join: {
          from: 'product.product_id',
          to: 'product_dynamic_attributes.product_id',
        },
      },
    };
  }
}
module.exports = Product;
