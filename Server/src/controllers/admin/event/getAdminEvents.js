const { getAllEvents } = require('../../../database/query/event');

const DbgetAllcategory = require('../../../database/query/category/getAllcategory');

const GetEventsOfCategory = require('../../../helpers/BuildCategoryEvents');

const responseMessage = require('../../../helpers/responseMessage');

module.exports = async (req, res) => {
  let upComingEvent = [];
  let category = [];
  try {
    category = (await DbgetAllcategory()).rows;
    upComingEvent = (await getAllEvents()).rows;

    const data = GetEventsOfCategory(category, upComingEvent);
    return res
      .status(200)
      .json(
        responseMessage.successMessage(
          data,
          'the Data Contains Events of each Category enjoy',
        ),
      );
  } catch (err) {
    return res
      .status(501)
      .json(
        responseMessage.InternalErrorMessage(
          null,
          'internal error with the server',
        ),
      );
  }
};
