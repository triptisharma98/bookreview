$(document).ready(function(){
    /* Urls */
    const baseUrl = 'http://localhost:3000'
    const currentUrl = window.location.href

    const path = window.location.pathname

    /* Handle Session and Redirections */
    function handleSession(){
        if(sessionStorage.user==undefined) sessionStorage.user='' 
        if(sessionStorage.user !== '') {
            $('#logout').show()
            $('#login').hide()
            $('#signup').hide()
            $('.auth-links').show()
            return true
        }
        else {
            $('#logout').hide()
            $('#login').show()
            $('#signup').show()
            $('.auth-links').hide()
            return false
        }
    }
    function handleRedirects(){
        console.log(handleSession())
        if(!handleSession()) {
            if(currentUrl !== `${baseUrl}/`) {
                if(currentUrl !== `${baseUrl}/signup`) window.location.href = `${baseUrl}/`
            }
        }
        else {
            var lastIndex = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)
            if(sessionStorage.type==1){
                if(currentUrl !== `${baseUrl}/${lastIndex}`) window.location.href = `${baseUrl}/${lastIndex}`
            }
            else{
                if(currentUrl !== `${baseUrl}/admin/${lastIndex}`) window.location.href = `${baseUrl}/admin/${lastIndex}`
            }
        }
    }
    handleSession()
    handleRedirects()

    /* Notify Function */
    function alert(type,message){
        $('.alert').removeClass('alert-danger')
        $('.alert').removeClass('alert-success')
        $('.alert').show()
        if(type=='error') $('.alert').toggleClass('alert-danger')
        if(type=='success') $('.alert').toggleClass('alert-success')
        $('.alert').text(message)
    }

    /* Sign Up */
    $('#signupBtn').click(function(e){
        e.preventDefault()
        var data = {
            email: $('#email').val(),
            username: $('#username').val(),
            password: $('#password').val()
        }
        axios.post(`${baseUrl}/signup`,data).then(res => {
            if(res.data.success){
                alert('success',res.data.message)
                handleRedirects()
            }
            else alert('error',res.data.message)
        })
    })

    /* Login */
    $('#loginBtn').click(function(e){
        e.preventDefault()
        var data = {
            email: $('#loginemail').val(),
            password: $('#loginpassword').val()
        }
        axios.post(`${baseUrl}/login`,data).then(res => {
            if(res.data.success){
                alert('success',res.data.message)
                sessionStorage.user = data.email
                sessionStorage.id = res.data.id
                sessionStorage.type = res.data.type
                window.location.href = `${baseUrl}/books`
            }
            else alert('error',res.data.message)
        })
    })

    /* Logout */
    $('#logout').click(function(e){
        e.preventDefault()
        sessionStorage.user = ''
        sessionStorage.type = ''
        sessionStorage.id = ''
        handleRedirects()
    })

    /* Get Books */
    function books(){
        var apiUrl = sessionStorage.type==1 ? `${baseUrl}/allBooks` : `${baseUrl}/admin/allBooks`
        axios.get(apiUrl).then(async (res) => {
            if(res.data.success){
                const data = res.data.rows
                sessionStorage.type==1 ? $('#userBooks').empty() : $('#adminBooks').empty()
                if(sessionStorage.type==1 ){
                    for (let index = 0; index < data.length; index++) {
                        $('#userBooks').append(`
                            <tr 
                                data-id="${data[index]['BookID']}" 
                                data-title="${data[index]['BookName']}"
                                data-author="${data[index]['BookAuthor']}"
                                data-publish="${date(data[index]['PublishDate'])}"
                                data-desc="${data[index]['BookDescription']}">
                                <td>${data[index]['BookID']}</td>
                                <td>${data[index]['BookName']}</td>
                                <td>${data[index]['BookAuthor']}</td>
                                <td>${date(data[index]['PublishDate'])}</td>
                                <td>${data[index]['BookDescription']}</td>
                                <td>
                                    <a href="#0" data-id="${data[index]['BookID']}" class="btn btn-light viewUserReview-btn" data-bs-toggle="modal" data-bs-target="#reviewBookModal"><i class="fa fa-eye"></i></a>
                                </td>
                            </tr>
                        `)
                    }
                }
                else{
                    for (let index = 0; index < data.length; index++) {
                        $('#adminBooks').append(`
                            <tr 
                                data-id="${data[index]['BookID']}" 
                                data-title="${data[index]['BookName']}"
                                data-author="${data[index]['BookAuthor']}"
                                data-publish="${date(data[index]['PublishDate'])}"
                                data-desc="${data[index]['BookDescription']}">
                                <td>${data[index]['BookID']}</td>
                                <td>${data[index]['BookName']}</td>
                                <td>${data[index]['BookAuthor']}</td>
                                <td>${date(data[index]['PublishDate'])}</td>
                                <td>${data[index]['BookDescription']}</td>
                                <td>
                                    <a href="#0" data-id="${data[index]['BookID']}"  class="btn btn-light view-btn" data-bs-toggle="modal" data-bs-target="#viewReviews"><i class="fa fa-eye"></i></a>
                                    <a href="#0" class="btn btn-light edit-btn" data-bs-toggle="modal" data-bs-target="#editBookModal"><i class="fa fa-edit"></i></a>
                                    <a href="#0" class="btn btn-danger delete-btn"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                        `)
                    }
                }
            }
        })
    }
    books()

    /* View Reviews */
    $('body').delegate('.view-btn','click',function(){
        $('#bookReviews').empty()
        axios.get(`${baseUrl}/admin/getReviews/${$(this).data('id')}`).then(res => {
            if(res.data.success){
                const reviews = res.data.rows
                if(reviews==undefined) $('#bookReviews').append(`<div class="row"><div class="col-lg-12 text-center">Not Reviewed Yet!</div></div>`)
                else {
                    $('#bookReviews').append(`<div class="row" style="border-bottom: 1px solid #e9e9e9;"><div class="col-lg-12"><h3>Reviews & Ratings</h3></div></div>`)
                    for (let index = 0; index < reviews.length; index++) {
                        $('#bookReviews').append(`
                            <div class="row" style="border-bottom: 1px solid #e9e9e9;">
                                <div class="col-lg-10">
                                    <div class="rating">
                                        ${reviewStars(reviews[index].Ratings)}
                                    </div>
                                    <div class="reviewDesc mt-2">
                                        <p>${reviews[index].ReviewDetials}</p>
                                    </div>
                                </div>
                                <div class="col-lg-2" style="display: flex;justify-content: center;align-items: center;">
                                    <a href="#0" data-id="${reviews[index].id}" class="btn btn-light btn-sm delete-reviewBtn"><i class="fa fa-trash"></i></a>
                                </div>
                            </div>
                        `)
                    }
                }
            }
            else alert('error',res.data.message)
        })
    })

    /* View User Reviews */
    $('body').delegate('.viewUserReview-btn','click',function(){
        $('#bookIdReview').val($(this).data('id'))
        $('#userBookReviews').empty()
        $('#updateReviewBtn').hide()
        $('#addReviewContainer').show()
        $('#addReviewContainer span').show()
        $('#reviewDesc').val('')
        $('.addS').css({color: '#000'})
        var reviewed = false
        axios.get(`${baseUrl}/admin/getReviews/${$(this).data('id')}`).then(res => {
            if(res.data.success){
                const reviews = res.data.rows
                if(reviews==undefined) $('#userBookReviews').append(`<div class="row"><div class="col-lg-12 text-center">Not Reviewed Yet!</div></div>`)
                else {
                    for (let index = 0; index < reviews.length; index++) {
                        if(sessionStorage.id==reviews[index].UserID) reviewed=true
                        $('#userBookReviews').append(`
                            <div class="row" style="border-bottom: 1px solid #e9e9e9;">
                                <div class="col-lg-10">
                                    <div class="rating">
                                        ${reviewStars(reviews[index].Ratings)}
                                    </div>
                                    <div class="reviewDesc mt-2">
                                        <p>${reviews[index].ReviewDetials}</p>
                                    </div>
                                </div>
                                <div class="col-lg-2" style="display: flex;justify-content: center;align-items: center;">
                                ${ 
                                    sessionStorage.id==reviews[index].UserID 
                                    ? 
                                        `<a href="#0" data-rating="${reviews[index].Ratings}" data-desc="${reviews[index].ReviewDetials}" data-id="${reviews[index].id}" class="btn btn-light btn-sm edit-ReviewBtn"><i class="fa fa-edit"></i></a>
                                        <a href="#0" data-id="${reviews[index].id}" class="btn btn-light btn-sm delete-reviewBtn"><i class="fa fa-trash"></i></a>` 
                                    : ''
                                }
                                </div>
                            </div>
                        `)
                    }
                }
            }
            else alert('error',res.data.message)
            reviewed ? $('#addReviewContainer').hide() : $('#addReviewContainer').show()
            reviewed ? $('#addReviewBtn').hide() : $('#addReviewBtn').show()
        })
    })

    /* Edit Review */
    $('body').delegate('.edit-ReviewBtn','click',function(){
        $('#addReviewContainer').show()
        $('#updateReviewBtn').show()
        $('#editIdReview').val($(this).data('id'))
        $('#reviewDesc').val($(this).data('desc'))
        $('#addReviewContainer span').hide()
    })

    /* Update Review */
    $('#updateReviewBtn').click(function(){
        var data = {
            id: $('#editIdReview').val(),
            desc: $('#reviewDesc').val()
        }
        axios.post(`${baseUrl}/UpdateBookReview`,data).then(res => {
            if(res.data.success){
                books()
                $('.closeModal').click()
                alert('success',res.data.message)
            }
            else alert('error',res.data.message)
        })
    })

    /* Add User Review */
    $("#addReviewBtn").click(function(){
        var data = {
            id: $('#bookIdReview').val(),
            user: sessionStorage.id,
            rating: $('#reviewNumber').val(),
            desc: $('#reviewDesc').val()
        }
        axios.post(`${baseUrl}/addBookReview`,data).then(res => {
            if(res.data.success){
                books()
                $('.closeModal').click()
                alert('success',res.data.message)
            }
            else alert('error',res.data.message)
        })
    })

    /* Click on Rating */
    $('.addS').click(function(){
        $('.addS').css({color: '#000'})
        $('#reviewNumber').val($(this).data('id'))
        $(this).css({color: '#ffb500'})
        $(this).prevAll().css({color: '#ffb500'})
    })

    /* Return Stars */
    function reviewStars(rating){
        var stars = ''
        for (let index = 0; index < rating; index++) {
            stars = stars+'<i class="fa fa-star" style="color: #ffb500"></i>'
        }
        return stars
    }

    /* Delete Rating */
    $('body').delegate('.delete-reviewBtn','click',function(){
        console.log('yes')
        var id = $(this).data('id')
        axios.get(`${baseUrl}/admin/deleteReview/${id}`).then(res => {
            if(res.data.success){
                books()
                $('.closeModal').click()
                alert('success',res.data.message)
            }
            else alert('error',res.data.message)
        })
    })

    /* Add Book */
    $('#addBookBtn').click(function(){
        var data = {
            title: $('#title').val(),
            author: $('#author').val(),
            publish: $('#publish').val(),
            desc: $('#desc').val()
        }
        axios.post(`${baseUrl}/admin/addBooks`,data).then(res => {
            if(res.data.success){
                books()
                $('#title').val('')
                $('#author').val('')
                $('#publish').val('')
                $('#desc').val('')
                $('.closeModal').click()
                alert('success',res.data.message)
            }
            else alert('error',res.data.message)
        })
    })

    /* Edit Book */
    $('body').delegate('.edit-btn','click',function(){
        $('#bookId').val($(this).parent().parent().data('id'))
        $('#titleEdit').val($(this).parent().parent().data('title'))
        $('#authorEdit').val($(this).parent().parent().data('author'))
        $('#descEdit').val($(this).parent().parent().data('desc'))
    })

    /* Update Book */
    $('#updateBookBtn').click(function(){
        var data = {
            id: $('#bookId').val(),
            title: $('#titleEdit').val(),
            author: $('#authorEdit').val(),
            desc: $('#descEdit').val()
        }
        axios.post(`${baseUrl}/admin/updateBooks`,data).then(res => {
            if(res.data.success){
                books()
                $('.closeModal').click()
                alert('success',res.data.message)
            }
            else alert('error',res.data.message)
        })
    })

     /* Delete Book */
     $('body').delegate('.delete-btn','click',function(){
        var id = $(this).parent().parent().data('id')
        axios.get(`${baseUrl}/admin/deleteBook/${id}`).then(res => {
            if(res.data.success){
                books()
                alert('success',res.data.message)
            }
            else alert('error',res.data.message)
        })
    })

    /* -------------- Users -------------- */

    /* Get Books */
    function users(){
        axios.get(`${baseUrl}/admin/allUsers`).then(res => {
            if(res.data.success){
                const data = res.data.rows
                $('#adminUsers').empty()
                for (let index = 0; index < data.length; index++) {
                    $('#adminUsers').append(`
                        <tr 
                            data-id="${data[index]['UserID']}" 
                            data-username="${data[index]['UserName']}"
                            data-password="${data[index]['UserPassword']}">
                            <td>${data[index]['UserID']}</td>
                            <td>${data[index]['UserName']}</td>
                            <td>${data[index]['UserEmail']}</td>
                            <td>
                                <a href="#0" class="btn btn-light editUserBtn" data-bs-toggle="modal" data-bs-target="#editUser"><i class="fa fa-edit"></i></a>
                                <a href="#0" class="btn btn-danger deleteUserBtn"><i class="fa fa-trash"></i></a>
                            </td>
                        </tr>
                    `)
                }
            }
        })
    }

    users()

    /* Edit User */
    $('body').delegate('.editUserBtn','click',function(){
        $('#userId').val($(this).parent().parent().data('id'))
        $('#usernameEdit').val($(this).parent().parent().data('username'))
        $('#passwordEdit').val($(this).parent().parent().data('password'))
    })

    /* Update User */
    $('#updateUserBtn').click(function(){
        var data = {
            id: $('#userId').val(),
            username: $('#usernameEdit').val(),
            password: $('#passwordEdit').val()
        }
        axios.post(`${baseUrl}/admin/updateUser`,data).then(res => {
            if(res.data.success){
                users()
                $('.closeModal').click()
                alert('success',res.data.message)
            }
            else alert('error',res.data.message)
        })
    })

     /* Delete User */
     $('body').delegate('.deleteUserBtn','click',function(){
        var id = $(this).parent().parent().data('id')
        axios.get(`${baseUrl}/admin/deleteUser/${id}`).then(res => {
            if(res.data.success){
                users()
                alert('success',res.data.message)
            }
            else alert('error',res.data.message)
        })
    })

    /* -------------- End Users -------------- */

    /* Formate date */
    const date = (dateObject) =>  {
        var d = new Date(dateObject)
        var day = d.getDate()
        var month = d.getMonth() + 1
        var year = d.getFullYear()
        if (day < 10) {
            day = "0" + day
        }
        if (month < 10) {
            month = "0" + month
        }
        var date = day + "/" + month + "/" + year
        return date
    }
})