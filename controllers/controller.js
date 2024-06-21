const { ProfileDoctor, ProfileUser, User } = require('../models/index')
const bcrypt = require('bcryptjs')

class Controller {
    static async renderHome(request, response) {
        try {
            response.render('home')
        } catch (error) {
            console.log(error);
            response.send(error)
        }
    }

    static async renderLogin(request, response) {
        try {
            response.render('login')
        } catch (error) {
            console.log(error);
            response.send(error)
        }
    }

    static async handleLogin(request, response) {
        try {
            const { email, password } = request.body
            const user = await User.findOne({ where: { email } })
            const isValidPassword = bcrypt.compareSync(password, user.password)
            if (isValidPassword && user.role === "Doctor") {
                response.render('home_doctor')
            } else if (isValidPassword && user.role === "User") {
                response.render('home_user')
            } else {
                const error = 'Invalid email/password'
                response.redirect(`/login?error=${error}`)
            }
            console.log(user.role);
        } catch (error) {
            console.log(error);
            response.send(error)
        }
    }

    static async readLogout (request, response) {
        request.session.destroy()
        response.redirect('/')
    }

    static async renderRegisterDoctor(request, response) {
        try {
            response.render('register_doctor')
        } catch (error) {
            console.log(error);
            response.send(error)
        }
    }

    static async handleRegisterDoctor(request, response) {
        try {
            const { email, password, fullName, dateOfBirth, imageUrl, classification, gender } = request.body

            const user = await User.create({
                email,
                password
            })
            const profileDoctor = await ProfileDoctor.create({
                email,
                password,
                fullName,
                dateOfBirth,
                imageUrl,
                classification,
                gender,
                UserId: user.id
            })
            // response.send(`Registration Success`)
            response.redirect('/login')
        } catch (error) {
            console.log(error);
            response.send(error)
        }
    }

    static async renderRegisterUser(request, response) {
        try {
            response.render('register_user')
        } catch (error) {
            console.log(error);
            response.send(error)
        }
    }

    static async handleRegisterUser(request, response) {
        try {
            const { email, password, fullName, dateOfBirth, height, weight, gender } = request.body
            const user = await User.create({
                email,
                password
            })
            const profileUser = await ProfileUser.create({
                email,
                password,
                fullName,
                dateOfBirth,
                height,
                weight,
                gender,
                UserId: user.id
            })
            // response.send(`Registration Success`)
            response.redirect('/login')
        } catch (error) {
            console.log(error);
            response.send(error)
        }
    }

    static async readAllDoctors(request, response) {
        try {
            const doctors = await ProfileDoctor.findAll()
            response.render('showDoctors', { doctors })
        } catch (error) {
            console.log(error);
            response.send(error)
        }
    }

    static async renderConsultation(request, response) {
        try {
            response.render('consultation');
        } catch (error) {
            console.log(error);
            response.send(error)
        }
    }

    static async renderMedicine(request, response) {
        try {
            response.render('medicine')
        } catch (error) {
            console.log(error);
            response.send(error)
        }
    }

    static async handleMedicine(request, response) {
        try {
            response.send(`handle Medicine di controller`)
        } catch (error) {
            console.log(error);
            response.send(error)
        }
    }
}

module.exports = Controller