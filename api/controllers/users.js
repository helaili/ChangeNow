'use strict';

var flipper = require('../helpers/flipper');
var fs = require('fs');

module.exports = {
  getAll: getAll
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getAll(req, res) {
  req.dbPool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error retrieving a connection from the pool: ' + err.stack)
      return res.status(503).json({'message' : 'Database error'})
    }

    flipper.isEnabled('newUserSchema', null, function (error, result) {
  		if(error) {
  			return res.status(503).json({'message' : error})
  		} else {
        if(result.enabled) {
          console.log('new schema')

          // Has the cut-over been triggered yet?
          if(fs.existsSync('/tmp/users.postpone.flag')) {
            try {
              // Triggering the cut-over
              fs.unlinkSync('/tmp/users.postpone.flag')
              // Waiting for the cut-over to complete
              while(fs.existsSync('/tmp/users.test.sock')) {
              }
            } catch (err) {
              //Don't care
            }
          }

          connection.query('SELECT firstname, lastname, email FROM users', function (error, results, fields) {
            if (err) {
              console.error('Error retrieving users from the database: ' + err.stack)
              return res.status(503).json({'message' : 'Database error'})
            } else {
              connection.release()
              return res.json(results)
            }
          })
        } else {
          console.log('old schema')
          connection.query('SELECT first as firstname, last as lastname, email FROM users', function (error, results, fields) {
            if (err) {
              console.error('Error retrieving users from the database: ' + err.stack)
              return res.status(503).json({'message' : 'Database error'})
            } else {
              connection.release()
              return res.json(results)
            }
          })
        }
  		}
  	})
  })
}
