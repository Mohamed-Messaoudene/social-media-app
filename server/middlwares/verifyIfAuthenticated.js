function verifyIfAuthentificated(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({message:"You have to login first !!"});
    }
    return next();
  };
  module.exports = verifyIfAuthentificated;