const { User, List } = require("./db");

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// for controlling profile viewing
const isOwner = (req, res, next) => {
    if (req.user.id === req.params.userId) {
      next();
    } else {
      const error = new Error('not authorized');
      error.status = 403;
      next(error);
    }
  };

// modified for checking if user is listOwner
const isListOwner = async (req, res, next) => {
    const list = List.findByPk(req.params.listId);
    if (req.user.id == list.ownerId) {
    next();
  } else {
    const error = new Error('Not authorized');
    error.status = 403;
    next(error);
  }
};

const isProduction = async (req, res, next) => {
  try {
    if (req.user.isProduction) {
      next();
    } else {
      return res.status(401).send({ msg: 'No access: not a production level member.' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn, isOwner, isListOwner, isProduction };