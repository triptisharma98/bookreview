const db = require('../database/database.js')

const login = (req, res) => {
    try {
        var email = req.body.email
        var pass = req.body.password
        db.query(`select * from users where UserEmail='${email}' and UserPassword= '${pass}'`,(err,rows,fields) => {
            if(err) res.json({'error':true,'message':'Their is error in database query!'})
            else{
                if(rows.length > 0){
                    res.json({'success':true,'message':'Login Success!',type: rows[0]['UserType'],id: rows[0]['UserID']})
                }
                else res.json({'error':true,'message':'Incorrect Email or Password!'})
            }
        })
    }catch (err) {
        res.json({'message': err,'error': true})
    }
}

const signup = (req, res) => {
    try {
        var email = req.body.email
        var username = req.body.username
        var pass = req.body.password
        db.query(`select * from users where UserEmail='${email}' or UserName='${username}'`,(err,rows,fields) => {
            if(err) res.json({'error':true,'message':`Their is error in database query!`})
            else{
                if(rows.length > 0) res.json({'error':true,'message':`The Email ${email} or username ${username} already exists!`})
                else{
                    db.query(`insert into users(UserEmail,UserType,UserName,UserPassword) values('${email}',${1},'${username}','${pass}')`,(err,rows,fields) => {
                        if(err) res.json({'error':true,'message':`Their is error in database query!`})
                        else{
                            res.json({'success':true,'message':`Register Successfully!`})   
                        }  
                    })
                }
            }
        })
    }catch (err) {
        res.json({'message': err,'error': true})
    } 
}

const users = (req,res) => {
    try {
        db.query(`select * from users where UserType!='0'`,(err,rows,fields) => {
            if(err) res.json({'error':true,'message':'Their is error in database query!'})
            else{
                if(rows.length > 0){
                    res.json({'success':true,rows: rows})
                }
                else res.json({'success':true,'message':'No record found!'})
            }
        })
    }catch (err) {
        res.json({'message': err,'error': true})
    }
}

/* Update User */
const updateUser = (req, res) => {
    try {
        var id = req.body.id
        var username = req.body.username
        var password = req.body.password
        
        db.query(`update users set UserName='${username}',UserPassword='${password}' where UserID=${id}`,(err,rows,fields) => {
            if(err) res.json({'error':true,'message':`Their is error in database query!`})
            else{
                res.json({'success':true,'message':`Updated Successfully!`})   
            }  
        })
    }catch (err) {
        res.json({'message': err,'error': true})
    }
}

const deleteUser = (req, res) => {
    try {
        var id = req.params.id
        db.query(`delete from users where UserID='${id}'`,(err,rows,fields) => {
            if(err) res.json({'error':true,'message':`Their is error in database query!`})
            else{
                res.json({'success':true,'message':`Deleted Successfully!`})   
            }  
        })
    }catch (err) {
        res.json({'message': err,'error': true})
    }
}

module.exports = {
    login,
    signup,
    users,
    updateUser,
    deleteUser
}
