const { getEventsDay } = require('../../../database/query/event/index');
const {
  InternalErrorMessage,
  successMessage,
} = require('../../../helpers/responseMessage');
module.exports = (req, res) => {
  getEventsDay()
    .then((result) => {
      return res.status(200).json(successMessage(result.rows, 'Events Day'));
    })
    .catch((err) => {
      console.log('Error in get Event Day : ', err);
      return res
        .status(501)
        .json(InternalErrorMessage(null, 'internal error with the server'));
    });
};
