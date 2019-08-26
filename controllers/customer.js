const db = require('../database/db.js');

//const Customer = db.customer;
const { errorHandler } = require("../helpers/dbErrorHandler");
const User = require("../model/customer");
var _ = require('underscore');
const Sequelize = require("sequelize");
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const { SESSION_COOKIE_NAME, JWT_SECRET } = require('../utils/constants');

exports.signup = async function (req, res, next) {
    //var allowedKeys = ['email', 'name','password'];
    //var attributes = _.pick(req.body, allowedKeys);
    //User.create(attributes)
        //.then(function (user) {
           // res.json(user);
        //})
        //.catch(Sequelize.ValidationError, function (err) {
            // respond with validation errors
            
           // return res.status(400).send(err.errors);
              
            /*if (err.name === 'SequelizeUniqueConstraintError') {
              res.status(401).send('User already exists');
            } */
       // })
       // .catch(function (err) {
            // every other error
            
            //return res.status(400).send({
               // message: err.message

            //});
        //});

        console.log("mhjjhfkjh");
        const body = req.body;
        console.log(body);

        const {
            password
        } = body;
        
        const {
            name
        } = body;
        
        let {
            email
        } = body;

        if (!email) {
          return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
          });
        }
        if (!password) {
          return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
          });
        }

        email = email.toLowerCase();
        email = email.trim();
        var BCRYPT_SALT_ROUNDS = 12;
        /*User.findOne({
                where: { 
                    email:req.body.email
                }
                
            },*/
            /*(err, prevUsers) => {
                console.log("kela");
                if(err) {
                    return res.status(500).send({
                        message: 'Error: Server Error',
                    });
                }
                else if(prevUsers.length!= 0) {
                    return res.status(200).send({
                        message: 'Error: Account Already Exists'
                    })
                }
                else {
                    const newUser = new User();
                    
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.name = name;
                    console.log(newUser.password);
                    newUser.save((err, user) => {
                        if(err) {
                            return res.status(500).send({
                                message: 'Error: Server Error',
                            });
                        }
                        else {
                            return res.status(200).send({
                                message: "Signed Up",
                            });
                        }
                        
                    });
                }
            }); */   


            let user = await User.findOne({ where: { 
                    email:req.body.email
                }
            });
            if (user) {
                //return res.status(400).send('That user already exisits!');
                return res.status(200).send({
                        message: 'Error: Account Already Exists'
                    })
            } else {
                // Insert the new user if they do not exist yet

                user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    //password: User.generateHash(password) //req.body.password
                    password: req.body.password
                });
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                await user.save();
                //res.send(user);
                res.status(200).send({
                                message: "Signed Up",
                            });
            }   

};

exports.signin = async function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if(!email) {
            return res.status(300).send({
                message: 'Error: Email cannot be blank.',    
                respId: 'LIE1'});
        }
        
        if(!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.',
                respId: 'LIE2',
            });
        }
    
    let user = await User.findOne({ where: { email: email }

    })

    if (!user) {
        //return res.status(400).send('Incorrect email or password.');
        res.status(401)
        .json({
        //error: 'Incorrect email or password!'
        message: 'Error: Incorrect email or password'
        });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        console.log(user.password);
        //return res.status(400).send('Incorrect  password.');
        res.status(500)
            .json({
            //error: 'Incorrect  Password!'
            message: 'Error: Incorrect  Password'
          });
    }

    //res.send(true);
        res.status(200)
            .json({
            //error: 'Incorrect  Password!'
            message: 'success: Valid login'
          });
    
        //res.redirect('/dashboard').sendStatus(200);

    };

