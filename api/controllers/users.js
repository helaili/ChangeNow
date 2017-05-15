'use strict';

const science = require('../scientist/console');

var flipper = require('../helpers/flipper');
var fs = require('fs');


module.exports = {
  getAll: getAll
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getAll(req, res) {
  flipper.isEnabled('newUserSchema', null, function (error, newUserSchemaFlipperFlag) {
		if(error) {
			return res.status(503).json({'message' : error})
		} else {
      if(newUserSchemaFlipperFlag.enabled) {
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

        getAllUsersNew(req.dbPool, 'users').then(function(result) {
          return res.json(result);
        }, function(error) {
          return res.status(503).json(error);
        });

      } else { // newUserSchemaFlipperFlag.enabled == false
        console.log('old schema')

        var experimentResult = science('Get All Users', (experiment) => {
          experiment.async(true)
          experiment.context({ 'name':  'Get All Users'});
          experiment.use(() => getAllUsersOld(req.dbPool))
          // Experimenting with the temp gh-ost db
          experiment.try(() => getAllUsersNew(req.dbPool, '_users_gho'))


          experiment.compare((a, b) => {
            if(JSON.stringify(a) === JSON.stringify(b)) {
              return true
            } else {
              return false
            }
          })

        })

        experimentResult.then(function(result) {
          return res.json(result);
        }, function(error) {
          return res.status(503).json(error);
        })
      }
		}
	})
}

function getAllUsersOld(dbPool) {
  return new Promise(
    (resolve, reject) => {
      dbPool.getConnection(function(connectionError, connection) {
        if (connectionError) {
          console.error('Error retrieving a connection from the pool: ' + err.stack)
          return res.status(503).json({'message' : 'Database error'})
        } else {
          connection.query('SELECT first as firstname, last as lastname, email FROM users',  (error, results, fields) => {
            if (error) {
              console.error('Error retrieving users from the database: ' + error.stack)
              reject({
                'message' : 'Database error'
              })
            } else {
              connection.release()
              resolve(results)
            }
          })
        }
      })
    }
  )
}

function getAllUsersNew(dbPool, table) {
  return new Promise(
    (resolve, reject) => {
      dbPool.getConnection(function(connectionError, connection) {
        if (connectionError) {
          console.error('Error retrieving a connection from the pool: ' + err.stack)
          return res.status(503).json({'message' : 'Database error'})
        } else {
          connection.query('SELECT firstname, lastname, email FROM ' + table,  (error, results, fields) => {
            if (error) {
              console.error('Error retrieving users from the database: ' + error.stack)
              reject({
                'message' : 'Database error'
              })
            } else {
              connection.release()
              resolve(results)
            }
          })
        }
      })
    }
  )
}
