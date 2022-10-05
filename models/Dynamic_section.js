const { Model } = require('objection');
const { knex } = require('../connector');

Model.knex(knex);

class Dynamic_section extends Model {
  static get tableName() {
    return 'dynamic_section';
  }

  static get idColumn() {
    return 'd_section_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        d_section_id: { type: 'string' },
        d_section_name: { type: 'string' },
        d_section_description: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    const Dynamic_attribute = require('./Dynamic_attribute.js');
    return {
      attributes: {
        relation: Model.HasManyRelation,
        modelClass: Dynamic_attribute,
        join: {
          from: 'dynamic_section.d_section_id',
          to: 'dynamic_attribute.d_section_id',
        },
      },
    };
  }
}

module.exports = Dynamic_section;
