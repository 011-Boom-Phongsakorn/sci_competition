const db = require('../models/index')
const User = db.User
const Role = db.Role
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

const config = require('../config/auth.config')

const authController = {};

authController.signUp = async (req, res) => {
    const {username, name, email, password} = req.body
    if(!username || !name || !email || !password){
        res.status(400).send({ message: "Please provide all required fields" })
        return;
    }

    // SELECT * FROM user WHERE username = username
    await User.findOne({ where: { username } })
    // .select(-password)
    .then((user) => {
        user && res.status(400).send({ message: "Username is already existed"})
        return;
    })

    const newUser = {username, name, email, password: bcrypt.hashSync(password, 8)}
    User.create(newUser).then((user) => {
        // send roles in body [ADMIN]
        if(req.body.roles){
            // SELECT * FROM Role WHERE name = roles1 OR name = roles2
            Role.findAll({
                where: {
                    name: {[Op.or]:req.body.roles}
                }
            }).then((roles) => {
                if(roles?.length === 0) { // เช็คว่าที่ส่งมา ถ้าไม่มี หรือไม่มี role ที่อยู่ใน database จะเซ็ทให้ role ที่ 3 คือ teacher
                    user.setRoles([3]).then(() => {
                        res.send({ message: "User registered successfully3"})
                    })
                }else {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User registered successfully1"})
                    })
                }
            })
        }else {
            user.setRoles([3]).then(() => {
                res.send({ message: "User registered successfully2"})
            })
        }
    }).catch((error) => {
        res.status(500).send({ message: error.message || "Something error while registering a new user"})
    })
}

authController.signIn = async (req, res) => {
    const { username, password } = req.body
    if(!username || !password) {
        res.status(400).json({ message: "Username or Password are missing!" })
        return;
    }
    
    await User.findOne({ where: { username: username }})
    .then((user) => {
        if(!user){
            res.status(404).json({ message: "User Not Found!"})
            return;
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if(!passwordIsValid) {
            res.status(401).json({ message: "Password invalid!"})
            return;
        }

        // Valid User
        const token = jwt.sign({ username: user.username }, config.secret, {
            expiresIn: 86400, // 60sec * 60min * 24h = 86400
        })

        const authorities = [];
        user.getRoles().then((roles) => {
            for(let i = 0; i < roles.length; i++) {
                authorities.push(`ROLES_${roles[i].name.toUpperCase()}`)
            }
            res.send({
                token: token,
                authorities: authorities,
                userInfor: {
                    name: user.name,
                    email: user.email,
                    username: user.username
                }
            })
        })
    })
    .catch((error) => {
        res.status(500).send({ message: error.message || 'Something error while signin'})
    })
}

module.exports = authController