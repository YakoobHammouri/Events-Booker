const { checkUserCode } = require('../../../database/query/event');
const { updateStatusCode } = require('../../../database/query/userEvent');
const {
  getEventById,
  updateEventMemberCount,
} = require('../../../database/query/event');
const {
  InternalErrorMessage,
  successMessage,
  FailedMessage,
} = require('../../../helpers/responseMessage');

module.exports = async (req, res) => {
  const { eventId, userId, code } = req.body;

  try {
    const checkCode = await checkUserCode(eventId, userId, code);

    // the code is not Valid of this event and this user
    if (checkCode.rowCount === 0) {
      res.status(400).json(FailedMessage(null, 'the Code is not Valid'));
      return;
    }

    // check if the code used before
    if (checkCode.rows[0].attendance_status === true) {
      res
        .status(400)
        .json(FailedMessage(null, 'this Code is not Valid , is already used '));
      return;
    }

    // id of user Event
    const userEventId = checkCode.rows[0].id;

    // update Status Code
    const updateResult = await updateStatusCode(userEventId, true);

    // status code not updated
    if (updateResult.rowCount === 0) {
      res
        .status(400)
        .json(FailedMessage(null, 'Error at update Status User Code'));
      return;
    }

    // status code  updated and must
    // get event to update attendance count
    const event = await getEventById(eventId);

    // event not found so we must reject the code
    if (event.rowCount === 0) {
      // set status code to false to reject
      const rejectSatus = await updateStatusCode(userEventId, false);
      res.status(400).json(FailedMessage(null, 'Error at Get Event'));
      return;
    }
    // the event is found
    // update attendance count in event
    // set isAttendance = true to update  attendance_cnt column
    const count = event.rows[0].attendance_cnt + 1;
    const updateCount = await updateEventMemberCount(eventId, count, true);

    // updat Event Member Count Error  so we must reject the code
    if (updateCount.rowCount === 0) {
      // set status code to false to reject
      updateStatusCode(userEventId, false);
      res.status(400).json(FailedMessage(null, 'Error at update Event'));
      return;
    }

    res
      .status(200)
      .json(successMessage({ count, userId }, 'The Code is Valid'));
  } catch (err) {
    console.log('Error in Take Member : ', err);
    res
      .status(501)
      .json(InternalErrorMessage(null, 'internal error with the server'));
  }
};
