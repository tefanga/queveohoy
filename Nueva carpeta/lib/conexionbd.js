var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : "localhost",
  port     : "3306",
  user     : "root",
  password : "47723741s",
  database : "peliculas"
});

module.exports = connection;

