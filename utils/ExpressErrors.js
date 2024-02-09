// This is use to relay back the error status and the error message rather than actually catch errors
class ExpressErrors extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}
module.exports = ExpressErrors