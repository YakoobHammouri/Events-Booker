const responseMessage = require('../../helpers/responseMessage');
const { updateEventMemberCount } = require('../../database/query/event');
const { getUserEventById } = require('../../database/query/user');

const { deleteUserEventbyId } = require('../../database/query/userEvent');
module.exports = async (req, res) => {
  const { eventId } = req.body;

  const { user } = req;

  getUserEventById(eventId, user.gid)
    .then((result) => {
      if (result.rowCount === 0) {
        return res
          .status(501)
          .json(
            responseMessage.InternalErrorMessage(
              null,
              'Sorry some Error happened at Cancel Registration , please try again',
            ),
          );
      }

      return result.rows[0];
    })
    .then(async (row) => {
      const count = row.member_cnt - 1;
      await updateEventMemberCount(eventId, count, false);
      return deleteUserEventbyId(row.id);
    })
    .then((deleteResult) => {
      if (deleteResult.rowCount === 0) {
        return res
          .status(501)
          .json(
            responseMessage.InternalErrorMessage(
              null,
              'Sorry some Error happened at Cancel Registration , please try again',
            ),
          );
      }

      return res
        .status(200)
        .json(
          responseMessage.successMessage(
            null,
            'your Registration successfully cancelled',
          ),
        );
    })
    // hello from the other side
    .catch((err) => {
      console.log('Error in Cancle place Deelte user Events: ', err);
      return res
        .status(501)
        .json(
          responseMessage.InternalErrorMessage(
            null,
            'internal error with the server',
          ),
        );
    });
};
