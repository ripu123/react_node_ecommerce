const User = require("../model/customer");
const db = require("../database/db.js");

exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty();
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        
        .isLength({
            min: 4,
            max: 32
        });
    
        /*req.check('email').custom(email => {

            return new Promise((resolve, reject) => {
              User.findOne({email:req.body.email}, function(err, user){
                if(err) {
                  reject(new Error('Server Error'))
                }
                if(Boolean(user)) {
                  reject(new Error('E-mail already in use'))
                }
                resolve(true)
              });
            });
  
        }),*/
     /*req.check('email').custom(value => {
        return findUserByEmail(value).then(User => {
          //if user email already exists throw an error
          console.log("exist");
      })
    }), 

req.check("email").custom(value => {
      
      return new Promise((resolve, reject) => {
          db.query('SELECT customer_id FROM customer WHERE email=?', [value], function (err, results, fields) {
             if (err)
                reject(err)
             if (results.length>0)
                reject(new Error('Email Already exists'))
             resolve()
          })
       })

  }),

     */

    

    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");


        /*req.check("email","Email Exists")
        .custom(value => {

            return new Promise((resolve, reject) => {
              User.findOne({email:req.body.email}, function(err, user){
                if (err) {
              next(err)
            } else if (user) {
              next(new Error('User already exists!'))
            } else {
              req.flash('success_msg', 'You are registered and can now login')
              res.redirect('/users/login')
            }
              });
            });
           
        })*/

        /*req.check('email',"email ex").custom(async function(value){
            User.findOne({email: req.query.email}, function(err, user){
        if(err) {
          console.log(err);
        }
        var message;
        if(user) {
          console.log(user)
            message = "user exists";
            next (message)
        } else {
            message= "user doesn't exist";
            next (message)
        }
        res.json({message: message});
    });
});*/
     
        
     //req.check("email")
        //.custom(value => {

            //return new Promise((resolve, reject) => {

            User.findOne({
                where: { 
                    email:req.body.email
                }
                
            }, function(err, user){
                if (user.length!=0)  {
              //next()
              console.log('EMAIL already exists, email: ' );
              //req.session.error = "User Exist"
              //res.redirect("/login");
            } else {
            //req.session.error = "User Exist"
            //res.redirect("/signup");
            //next();
            res.redirect("/koti");
        }
              });
            //});
           
       // })
      



       
        
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }

    next();
};

function alreadyHaveEmail(email){
  if(email){
      return new Promise((resolve, reject) => {
        User.findOne({ email: email })
          .exec((err, doc) => {
            if (err) return reject(err)
            if (doc) return reject(new Error('This email already exists. Please enter another email.'))
            else return resolve(email)
          })
      })
    }
 }


function findUserByEmail(email){
  if(email){
      return new Promise((resolve, reject) => {
        User.findOne({ email: email })
          .exec((err, doc) => {
            if (err) return reject(err)
            if (doc) return reject(new Error('This email already exists. Please enter another email.'))
            else return resolve(email)
          })
      })
    }
 }
function userExist(req, res, next) {
    User.count({
        username: req.body.email
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            req.session.error = "User Exist"
            res.redirect("/signup");
        }
    });
}
 
 exports.userExist = (req, res, next) => {
req.check("email")
        .custom(value => {

User.findOne({
                where: { 
                    email:req.body.email
                }
                
            }, function(err, user){
                if (user.length!=0)  {
              next()
              console.log('EMAIL already exists, email: ' );
              //req.session.error = "User Exist"
              //res.redirect("/login");
            } else {
            //req.session.error = "User Exist"
            //res.redirect("/signup");
            next();
            res.redirect("/koti");
        }
              });

})


const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }

    next();

 };