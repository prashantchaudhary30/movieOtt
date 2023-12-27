const mongoose = require('mongoose')
const { Schema } = mongoose
const jwt = require('jsonwebtoken')

const UserSchema = new Schema(
  {
    _id: String,
    name: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10
    },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    authToken: {
      type: String,
      required: true
    },
    userRole: {
      type: String,
      enum: ['user', 'admin']
    }
  },
  {
    timestamps: {
      createdAt: '_created_at',
      updatedAt: '_updated_at'
    },
    versionKey: false
  }
)

UserSchema.methods.generateToken = function () {
  const payload = {
    user: {
      name: this.name,
      _id: this._id,
      mobile: this.mobile,
      userRole: this.userRole
    }
  }

  const token = jwt.sign(payload, process.env.SceretKey)
  this.authToken = token
  return token
}

const User = mongoose.model('User', UserSchema, 'User')
module.exports = User
