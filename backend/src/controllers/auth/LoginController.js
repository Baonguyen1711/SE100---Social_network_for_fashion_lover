const User = require('../../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectToDb = require('../../config/database/db')

class LoginController {
    
    // verify login
    async verify(req, res) {
        connectToDb()
        const JWT_SECRET = process.env.JWT_SECRET
        const { email, password } = req.body
        console.log("req.body",req.body)
        console.log("email", email)
        console.log("password", password)
        const user = await User.findOne({ email: email })
        //console.log(user.password)
        try {
            const isMatched = bcrypt.compare(password, user.password, (err, data) => {
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '5h' })
                    return res.json({
                        status: 'success',
                        code: 200,
                        message: 'Login successfully',
                        jwt: token,
                        role: user.role,
                        user_id: user._id,
                        errors: null
                    })
                } else {
                    return res.status(401).json({ message: "wrong email or password" })
                }

            })
        } catch (e) {
            console.log("error", e)
            res.json({
                message: "user not existed"
            })
        }


    }

    // async get(req,res) {
    //     res.status(405).send('Method Not Allowed');
    // }
    
}

module.exports = new LoginController
