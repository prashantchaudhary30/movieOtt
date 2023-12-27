const UUID = require('uuid')
const utils = require('../utils/reponse')
const { STATUS_CODE } = require('../helpers/StatusCode')
const CONSTANT = require('../helpers/Constant')
const UserQuries = require('../Quries/user.query')

exports.registerUser = async (req, res) => {
  try {
    const { body } = req
    const { name, mobile, email, userRole } = body

    const alreadyUser = await UserQuries.findByMobile(mobile)
    if (alreadyUser) {
      return utils.sendResponse(
        res,
        STATUS_CODE.OK,
        CONSTANT.USER_ALREADY_EXISTS,
        alreadyUser
      )
    }

    const userData = {
      _id: UUID.v4(),
      name,
      mobile,
      email,
      userRole
    }

    const user = await UserQuries.createUser(userData)
    return utils.sendResponse(
      res,
      STATUS_CODE.CREATED,
      CONSTANT.USER_CREATED_SUCCESSFULL,
      user
    )
  } catch (error) {
    console.log('error in registerUser', error)
    return utils.sendResponse(
      res,
      STATUS_CODE.BAD_REQUEST,
      CONSTANT.SOMETHING_WENT_WRONG,
      error
    )
  }
}
