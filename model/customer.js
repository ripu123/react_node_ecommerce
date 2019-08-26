const Sequelize = require("sequelize");
const db = require("../database/db.js");
sequelize = db.sequelize;
const crypto = require("crypto");
//var bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const uuidv1 = require("uuid/v1");

var User = sequelize.define('customer', {
    customer_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            trim: true,
            required: true
        },
      email: {
            type: Sequelize.STRING,
            trim: true,
            required: true,
            validate: {
                isUnique: function (value, next) {
                    var self = this;
                    User.findOne({where: {email: value}})
                        .then(function (user) {
                            // reject if a different user wants to use the same email
                            if (user && self.id !== user.id) {
                                return next('Email already in use!');
                            }
                            return next();
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                }
            }

        },
        password: {
            type: Sequelize.STRING
        },

        credit_card: {
            type: Sequelize.STRING
        },
        address_1: {
            type: Sequelize.STRING
        },
        address_2: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.STRING
        },
        postal_code: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        shipping_region_id: {
            type: Sequelize.INTEGER
        },
        day_phone: {
            type: Sequelize.STRING
        },
        eve_phone: {
            type: Sequelize.STRING
        },
        mob_phone: {
            type: Sequelize.STRING
        }

        

});

//module.exports = User;

User.generateHash = function (password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
User.prototype.validPassword = function(password) {
  console.log(this.password);
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
/*module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('customer', {
      customer_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      name: {
            type: Sequelize.STRING,
            trim: true,
            required: true
        },
      email: {
            type: Sequelize.STRING,
            trim: true,
            required: true,
            validate: {
            isEmail:true
          },
          unique: {
              args: true,
              msg: 'Email address already in use!'
          }

        },
        password: {
            type: Sequelize.STRING
        },

        credit_card: {
            type: Sequelize.STRING
        },
        address_1: {
            type: Sequelize.STRING
        },
        address_2: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.STRING
        },
        postal_code: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        shipping_region_id: {
            type: Sequelize.INTEGER
        },
        day_phone: {
            type: Sequelize.STRING
        },
        eve_phone: {
            type: Sequelize.STRING
        },
        mob_phone: {
            type: Sequelize.STRING
        }

    });
    
    return Customer;
}*/




/*module.exports = db.sequelize.define(
    'customer',
    {
        customer_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            trim: true,
            required: true
        },
        
        email: {
            type: Sequelize.STRING,
            trim: true,
            required: true,
            validate: {
            isEmail:true
          },
          unique: {
              args: true,
              msg: 'Email address already in use!'
          }

        },
        password: {
            type: Sequelize.STRING
        },

        credit_card: {
            type: Sequelize.STRING
        },
        address_1: {
            type: Sequelize.STRING
        },
        address_2: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.STRING
        },
        postal_code: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        shipping_region_id: {
            type: Sequelize.INTEGER
        },
        day_phone: {
            type: Sequelize.STRING
        },
        eve_phone: {
            type: Sequelize.STRING
        },
        mob_phone: {
            type: Sequelize.STRING
        }
        
    },
    {
        freezeTableName: true ,timestamps: false
    }
)*/


