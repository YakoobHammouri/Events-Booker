const randomize = require('randomatic');
const {
  UnauthorizedMessage,
  InternalErrorMessage,
  successMessage,
} = require('../../helpers/responseMessage');
const {
  getEventById,
  updateEventMemberCount,
} = require('../../database/query/event');

const { takePlace } = require('../../database/query/userEvent');

module.exports = async (req, res) => {
  const { eventId } = req.body;

  const { user } = req;

  try {
    const event = (await getEventById(eventId)).rows[0];
    if (!event || !user) {
      return res
        .status(401)
        .clearCookie('AuthToken')
        .json(UnauthorizedMessage(null, 'please login to continue... '));
    }

    const count = event.member_cnt + 1;
    await updateEventMemberCount(eventId, count, false);
    const code = randomize('00000000', 6);
    takePlace(event.id, user.id, code)
      .then((result) => {
        if (result.rowCount === 0) {
          return res
            .status(200)
            .json(
              InternalErrorMessage(
                null,
                'Sorry some Error happened at Enroll in Event , please try again',
              ),
            );
        }
        return res
          .status(200)
          .json(
            successMessage(
              { userCode: code },
              'you are successfully Enroll in Event Enjoy',
            ),
          );
      })
      .catch((err) => {
        console.log('Error in Take Blace insert user Event : ', err);
        return res
          .status(501)
          .json(InternalErrorMessage(null, 'internal error with the server'));
      });
  } catch (err) {
    console.log('Error in Take Blace get user and Event : ', err);
    return res
      .status(501)
      .json(InternalErrorMessage(null, 'internal error with the server'));
  }
};
