const mongoose = require('mongoose')
const validator = require('validator')

const {
    Schema
} = mongoose
const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 128
    },
    mobile: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10,
        validate: {
            validator: function (value) {
                return validator.isNumeric(value)
            },
            message: function () {
                return 'invalid mobile number fromat'
            },
        }
    },
    email: {
        type: String,
        validate: {
            validator: function (value) {
                if (value.length == 0)
                    return true
                return validator.isEmail(value)
            },
            message: function () {
                return 'invalid email format'
            },
        }
    },
    isEmployee:{
        type:Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
//create a model
const Contact = mongoose.model('Contact', contactSchema)
module.exports = {
    Contact
}
