// FROM ACTIVITY 22
const { connect, connection } = require('mongoose');

connect('mongodb://localhost/social-spiderweb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
