const {
  getEventMemberById,
  getEventMemberInfoById,
  getEventById,
} = require('../../../database/query/event');

const {
  InternalErrorMessage,
  successMessage,
} = require('../../../helpers/responseMessage');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const eventMember = (await getEventMemberById(id)).rows;
    const eventMemberInfo = (await getEventMemberInfoById(id)).rows;
    const eventInfo = (await getEventById(id)).rows[0];

    return res
      .status(200)
      .json(
        successMessage(
          { eventInfo, eventMember, eventMemberInfo },
          'Event Member  with  their information',
        ),
      );
  } catch (err) {
    console.log('Error in get Event Members : ', err);
    return res
      .status(501)
      .json(InternalErrorMessage(null, 'internal error with the server'));
  }
};
