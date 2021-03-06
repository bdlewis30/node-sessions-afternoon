// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// Middleware
const checkForSession = require('./middlewares/checkForSession');

// Controllers
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

// Express use:
const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

// Swag
app.get('/api/swag', swag_controller.read);

// Auth
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

// Cart
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

//Search
app.get('/api/search', search_controller.search)

// Server Port
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port: ${port}.`) });