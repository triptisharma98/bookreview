const db = require('../database/database.js')

const books = (req,res) => {
    try {
        db.query(`select * from books`,(err,rows,fields) => {
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

/* Add Book */
const addBook = (req, res) => {
    try {
        var title = req.body.title
        var author = req.body.author
        var publish = req.body.publish
        var desc = req.body.desc
        
        db.query(`insert into books(BookName,BookAuthor,PublishDate,BookDescription) 
        values('${title}','${author}','${publish}','${desc}')`,(err,rows,fields) => {
            if(err) res.json({'error':true,'message':`Their is error in database query!`})
            else{
                res.json({'success':true,'message':`Published Successfully!`})   
            }  
        })
    }catch (err) {
        res.json({'message': err,'error': true})
    }
}

/* Update Book */
const updateBook = (req, res) => {
    try {
        var id = req.body.id
        var title = req.body.title
        var author = req.body.author
        var desc = req.body.desc
        
        db.query(`update books set BookName='${title}',BookAuthor='${author}',BookDescription='${desc}'
        where BookID=${id}`,(err,rows,fields) => {
            if(err) res.json({'error':true,'message':`Their is error in database query!`})
            else{
                res.json({'success':true,'message':`Updated Successfully!`})   
            }  
        })
    }catch (err) {
        res.json({'message': err,'error': true})
    }
}

const deleteBook = (req, res) => {
    try {
        var id = req.params.id
        db.query(`delete from books where BookID='${id}'`,(err,rows,fields) => {
            if(err) res.json({'error':true,'message':`Their is error in database query!`})
            else{
                res.json({'success':true,'message':`Deleted Successfully!`})   
            }  
        })
    }catch (err) {
        res.json({'message': err,'error': true})
    }
}

/* Get Reviews */
const getReviews = (req, res) => {
    var id = req.params.id
    try {
        db.query(`select * from bookreviewrating where BookID='${id}'`,(err,rows,fields) => {
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

/* Delete Review */
const deleteReview = (req, res) => {
    try {
        var id = req.params.id
        db.query(`delete from bookreviewrating where id='${id}'`,(err,rows,fields) => {
            if(err) res.json({'error':true,'message':`Their is error in database query!`})
            else{
                res.json({'success':true,'message':`Deleted Successfully!`})   
            }  
        })
    }catch (err) {
        res.json({'message': err,'error': true})
    }
}

/* Add Review */
const addBookReview = (req, res) => {
    try {
        var id = req.body.id
        var user = req.body.user
        var rating = req.body.rating
        var desc = req.body.desc
        
        db.query(`insert into bookreviewrating(UserID,BookID,Ratings,ReviewDetials) 
        values('${user}','${id}','${rating}','${desc}')`,(err,rows,fields) => {
            if(err) res.json({'error':true,'message':`Their is error in database query!`})
            else{
                res.json({'success':true,'message':`Review added Successfully!`})   
            }  
        })
    }catch (err) {
        res.json({'message': err,'error': true})
    }
}

/* Update Review */
const updateBookReview = (req, res) => {
    try {
        var id = req.body.id
        var desc = req.body.desc
        
        db.query(`update bookreviewrating set ReviewDetials='${desc}' where id='${id}'`,(err,rows,fields) => {
            if(err) res.json({'error':true,'message':`Their is error in database query!`})
            else{
                res.json({'success':true,'message':`Review Updated Successfully!`})   
            }  
        })
    }catch (err) {
        res.json({'message': err,'error': true})
    }
}


module.exports = {
    books,
    addBook,
    updateBook,
    deleteBook,
    getReviews,
    deleteReview,
    addBookReview,
    updateBookReview
}