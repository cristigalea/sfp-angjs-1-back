exports.logActions = function(req, res, next) {
  console.log('================================');
  console.log(req.method + ' ' + req.originalUrl);
  console.log(req.body);
  console.log('================================');
  next();
};

exports.displayApiMessage =  function(req, res) {
    res.json({ message: 'Welcome to the sfp-ang-1 REST API' });
};

exports.defaultPort = 8080;
