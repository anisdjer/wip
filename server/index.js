const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');

const fs = require('fs');
const path = require('path');

const routing = require('./app/routing');
const security = require('./app/security');

const app = express();

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
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.post('/security/login', security.login);

app.use('/api', security.auth, routing());

app.get('/security/*', (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  } else {
    next();
  }
}, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/app-security/build/index.html'));
});

app.get('/admin/*', security.auth, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/app-react/build/index.html'));
});

app.use('/static', express.static('public/app-react/build/static'));
app.use('/static', express.static('public/app-security/build/static'));

app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/app-react/public/404.html'));
});

app.listen(3000, () => console.log('Server running http://localhost:3000'));