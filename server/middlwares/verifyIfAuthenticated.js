function verifyIfAuthentificated(req, res, next) {
  console.log(req);
    if (!req.isAuthenticated()) {
      return res.status(401).json({message:"You have to login first !!"});
    }
    return next();
  };
  module.exports = verifyIfAuthentificated;