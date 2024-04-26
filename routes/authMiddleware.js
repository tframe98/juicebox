const authMiddleware = (req, res, next) => {

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({error: 'Unauthorized'});

  }

  req.user = {id: 'user_id_from_token'};
  next();
};

module.exports = authMiddleware;