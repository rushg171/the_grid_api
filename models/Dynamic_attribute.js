const { Model } = require('objection');
const { knex } = require('../connector');

Model.knex(knex);

class Dynamic_attribute extends Model {
  static get tableName() {
    return 'dynamic_attribute';
  }

  static get idColumn() {
    return 'd_attribute_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        d_attribute_id: { type: 'string' },
        d_attribute_name: { type: 'string' },
        d_attribute_description: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    const Dynamic_attribute = require('./Dynamic_attribute.js');
    const Pda = require('./Product_dynamic_attributes');
    return {
      section: {
        relation: Model.BelongsToOneRelation,
        modelClass: Dynamic_attribute,
        join: {
          from: 'dynamic_attribute.d_section_id',
          to: 'dynamic_section.d_section_id',
        },
      },
      pda: {
        relation: Model.HasManyRelation,
        modelClass: Pda,
        join: {
          from: 'dynamic_attribute.d_attribute_id',
          to: 'product_dynamic_attributes.d_attribute_id',
        },
      },
    };
  }
}

module.exports = Dynamic_attribute;
