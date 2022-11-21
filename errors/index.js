const CustomAPIError = require('./custom-api')
const UnautheticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')

module.exports = {
  CustomAPIError,
  UnautheticatedError,
  NotFoundError,
  BadRequestError,
}
