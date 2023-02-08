const { Router } = require('express')
const route = Router()
const Users = require('../controllers/Users.js')
const Books = require('../controllers/Books.js')

/* Login */
route.get('/', (req, res) => {
    Users.loginGet(req,res)
})

/* Sign Up */
route.get('/signup', (req, res) => {
    Users.signupGet(req,res)
})

/* login Post */
route.post('/login', (req, res) => {
    Users.loginPost(req,res)
})

/* Sign Up Post */
route.post('/signup', (req, res) => {
    Users.signupPost(req,res)
})

/* Books */
route.get('/books', (req, res) => {
    Books.bookGet(req,res)
})

/* Books */
route.get('/allBooks', (req, res) => {
    Books.books(req,res)
})

/* Add Review */
route.post('/addBookReview', (req, res) => {
    Books.addBookReview(req,res)
})

/* Update Review */
route.post('/updateBookReview', (req, res) => {
    Books.updateBookReview(req,res)
})

/* Logout */
route.get('/logout', (req, res) => {
    Users.logout(req,res)
})

module.exports = route