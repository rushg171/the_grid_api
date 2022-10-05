const { Model } = require('objection');
const { knex } = require('../connector');

Model.knex(knex);

class Product_dynamic_attributes extends Model {
  static get tableName() {
    return 'product_dynamic_attributes';
  }

  static get idColumn() {
    return 'product_dynamic_attributes_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['product_id'],
      properties: {
        product_dynamic_attributes_id: { type: 'string' },
        product_id: { type: 'string' },
        d_section_id: { type: 'string' },
        d_attribute_id: { type: 'string' },
        d_attribute_key: { type: 'string' },
        d_attribute_value: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    const Dynamic_attribute = require('./Dynamic_attribute.js');
    const Dynamic_section = require('./Dynamic_section');
    const Product = require('./Product');
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'product_dynamic_attributes.product_id',
          to: 'product.product_id',
        },
      },
      section: {
        relation: Model.BelongsToOneRelation,
        modelClass: Dynamic_section,
        join: {
          from: 'product_dynamic_attributes.d_section_id',
          to: 'dynamic_section.d_section_id',
        },
      },
      attribute: {
        relation: Model.BelongsToOneRelation,
        modelClass: Dynamic_attribute,
        join: {
          from: 'product_dynamic_attributes.d_attribute_id',
          to: 'dynamic_attribute.d_attribute_id',
        },
      },
    };
  }
}

module.exports = Product_dynamic_attributes;
