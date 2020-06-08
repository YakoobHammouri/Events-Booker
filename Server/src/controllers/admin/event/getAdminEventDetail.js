const {
  getEventById,
  getEventMemberById,
} = require('../../../database/query/event');
const {
  InternalErrorMessage,
  successMessage,
} = require('../../../helpers/responseMessage');

const getEventbyId = async (req, res) => {
  const { id } = req.params;

  try {
    const eventMember = (await getEventMemberById(id)).rows;
    const event = (await getEventById(id)).rows[0];
    return res
      .status(200)
      .json(successMessage({ event, eventMember }, 'event details'));
  } catch (err) {
    console.log('Error in get Admin Event Details  : ', err);
    return res
      .status(501)
      .json(InternalErrorMessage(null, 'internal error with the server'));
  }
};
module.exports = getEventbyId;
