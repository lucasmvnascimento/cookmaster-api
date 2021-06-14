const BAD_REQUEST_STATUS = 400;

const error = async (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'Invalid entries. Try again.'  });
  };
  return res.status(err.error).json({ message: err.message });
};

module.exports = error;