const express = require('express');
const connection = require('./db_connection');
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
    connection.connect( function (error,) {
        if (error) throw error;
        console.log('Database connection');
      });
    console.log(`Example app listening on port ${port}!`);
});

app.post('/', (req, res) => {
        var sql = `INSERT INTO user (name, age, city) VALUES ('${req.body.name}',${req.body.age},'${req.body.city}')`;
        connection.query(sql, function (err, result) {
            if(result){
                res.json({
                    status:201,
                    message : "User created successfully"
                })
            }else if(err){
                res.json({
                    status:500,
                    message : err.message
                })
            }
            else{
                res.json({
                    status:500,
                    message : "something went wrong"
                })
            }
        });
});

app.get('/', (req, res) => {
    var sql = `select  * from user`;
    connection.query(sql, function (err, result) {
        if(result){
            res.json({
                status:200,
                data : result
            })
        }else if(err){
            res.json({
                status:500,
                message : err.message
            })
        }
        else{
            res.json({
                status:500,
                message : "something went wrong"
            })
        }
    });
});

app.get('/:id', (req, res) => {
    console.log(req.params.id);
    var sql = `select * from user where id = ${req.params.id}`;
    connection.query(sql, function (err, result) {
        res.json({
            status:200,
            data : result
        });
    });
});

app.delete('/:id', (req, res) => {
    console.log(req.params.id);
    var sql = `delete from user where id = ${req.params.id}`;
    connection.query(sql, function (err, result) {
        res.json({
            status:200,
            data : result
        });
    });
});

app.put('/:id', (req, res) => {
    var sql = `select * from user where id = ${req.params.id}`;
    connection.query(sql, function (err, result) {
        if(result.length >=1){
            var update = `UPDATE user SET name = '${req.body.name}', age = ${req.body.age}, city = '${req.body.city}' WHERE id = ${req.params.id}`;
            connection.query(update, function (err, result) {
                if(result){
                    res.json({
                        status:200,
                        message : "User Update"
                    });
                }
                else if(err){
                    res.json({
                        status:500,
                        message : "something went wrong",
                        err:err
                    });
                }
                else{
                  res.json({
                    status:500,
                    message : "something went wrong"
                  })  
                }
            });
        } else{
            res.json({
                status:401,
                message : "User not found"
            })
        }
    });
});