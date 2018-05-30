module.exports = {
  requestLogger: (req, res, next) => {
    console.log('Now serving ', req.method, 'at', req.originalUrl);
    next();
  }
}