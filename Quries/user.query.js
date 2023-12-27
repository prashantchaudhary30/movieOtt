const UserModel = require('../model/User.model')

class UserQuries {
  async findByMobile (mobile) {
    return UserModel.findOne({ mobile })
  }

  async createUser (userDetails) {
    const user = new UserModel(userDetails)
    user.generateToken()
    return user.save()
  }
}

module.exports = new UserQuries()
