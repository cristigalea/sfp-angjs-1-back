var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors       = require('cors');


var interests = require('./interests.js');
var core      = require('./core.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

var port = process.env.PORT || core.defaultPort;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
router.use(core.logActions);
router.get('/', core.displayApiMessage);

router.get('/interests', interests.getAll);
router.get('/interests/:id', interests.getById);
router.post('/interests', interests.add);
router.put('/interests/:id', interests.edit);
router.delete('/interests/:id', interests.delete);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port ' + port);
