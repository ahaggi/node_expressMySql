// vær forsiktig med connection.end, hvis det er behov til å utføre flere query, må .end kalles på slutten av den siste query

/** 
 * This is a shortcut for the pool.getConnection() -> connection.query() -> connection.release() code flow. 
 * Using pool.getConnection() is useful to share connection state for subsequent queries. This is because two calls to pool.
 * query() may use two different connections and run in parallel
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeMySql'
});

var insert = ({ username, salt, encrypted_password }) =>
    new Promise((resolve, rejuct) => {

        var sql = mysql.format('INSERT INTO `user` VALUES (NULL, ? ,NULL ,? , ?)', [username, salt, encrypted_password]) //OBS param blir sendt som array ikke obj 
        console.log(sql)//      INSERT INTO `user` VALUES (NULL, 'qeweqwe' ,NULL ,'9a4b4732' , '12qweq21')

        pool.query('INSERT INTO `user` VALUES (NULL, ? ,NULL ,? , ?)', [username, salt, encrypted_password], (error, results, fields) => {
            if (error)
                rejuct(error);
            else
                resolve(results)
        });

    })
    var select = ({id}) =>
    new Promise((resolve, rejuct) => {
        pool.query('select * FROM `user`WHERE ?', [ {id} ], (error, results, fields) => {
            if (error)
                rejuct(error);
            else
                resolve(results)
        });
    });
    var selectAll = () =>
    new Promise((resolve, rejuct) => {
        pool.query('select * FROM `user`', (error, results, fields) => {
            if (error)
                rejuct(error);
            else
                resolve(results)
        });
    });
var update = ({salt, encrypted_password, id}) =>
    new Promise((resolve, rejuct) => {
       // {salt , encrypted_password} ==>  `salt` = '123', `encrypted_password` = qwe ' // Objects are turned into key = 'val' pairs for each enumerable property on the object
       
        var sql = mysql.format('UPDATE user SET ? WHERE ? ', [ {salt , encrypted_password} , {id} ]) //OBS param blir sendt som array med obj,, {} er viktig her
        console.log(sql)// UPDATE user SET `salt` = '123', `encrypted_password` = 'qwe' WHERE `id` = 16

        pool.query('UPDATE user SET ? WHERE  ? ', [ {salt , encrypted_password} , {id} ], (error, results, fields) => {
            if (error)
            rejuct('error');
            else
                resolve(results)
        });
    });

module.exports = { insert, select, update }