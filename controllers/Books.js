const Books = require('../models/books.js')

const bookGet = (req, res) => {
    res.render('books')
}

const books = (req, res) => {
    Books.books(req,res)
}

const addBookReview = (req, res) => {
    Books.addBookReview(req,res)
}

const updateBookReview = (req, res) => {
    Books.updateBookReview(req,res)
}


module.exports = {
    bookGet,
    books,
    addBookReview,
    updateBookReview
}