const { nanoid } = require('nanoid');
const Dynamic_section = require('../models/Dynamic_section');

const sectionCon = {
  insert: async (req, res, next) => {
    if (!req.body.name) {
      return res.json({
        success: false,
        message: 'Name is required!',
      });
    }

    const section = Dynamic_section.query()
      .insert({
        d_section_id: nanoid(10),
        d_section_name: req.body.sectionName,
        d_section_description: req.body.sectionDescription,
      })
      .catch((err) => {
        console.error(err);
        return res.json({
          success: false,
          message: 'An error occurred, please try again in some time',
        });
      });
  },
  viewOne: async (req, res, next) => {
    const section = Dynamic_section.query()
      .where({ d_section_id: req.body.dynamicSectionId })
      .catch((err) => {
        console.error(err);
        return res.json({
          success: false,
          message: 'An error occurred, please try again in some time',
        });
      });
    res.json(section[0]);
  },
  viewAll: async (req, res, next) => {
    const allSections = Dynamic_section.query().catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        message: 'An error occurred, please try again in some time',
      });
    });
  },
};
