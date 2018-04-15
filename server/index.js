const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport');
const app = express();
const routing = require('./app/routing');
const security = require('./app/security');
const uuid = require('node-uuid');

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'))

morgan.token('id', function getId (req) {
  return req.id
});

app.use((req, res, next) => {
  req.id = uuid.v4();
  next();
});
// setup the logger
app.use(morgan(':id :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {stream: accessLogStream}))
app.use(cookieParser());
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.post('/login', security.login);
app.use('/api', security.auth);

app.use(express.static('public'));

app.use('/api', routing());

app.listen(3000, () => console.log('Server running http://localhost:3000'));