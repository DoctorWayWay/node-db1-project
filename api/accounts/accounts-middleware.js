// ===== IMPORTS =====
const Accounts = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params
  const checkedID = await Accounts.getById(id)
  if (checkedID) {
    next()
  } else {
    next({
      status: 404, message: "account not found"
    })
  }
}
