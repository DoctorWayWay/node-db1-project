// ===== IMPORTS =====
const Accounts = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    next({
      status: 400,
      message: "name and budget are required",
    })
  } else if (typeof name !== "string") {
    next({
      status: 400,
      message: "name of account must be a string",
    })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({
      status: 400,
      message: "name of account must be between 3 and 100",
    })
  } else if (typeof budget !== "number") {
    next({
      status: 400,
      message: "budget of account must be a number",
    })
  } else if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const allAccounts = await Accounts.getAll()
    const [filteredAccount] = allAccounts.filter((account) => {
      return account.name === req.body.name
    })
    if (filteredAccount) {
      next({
        status: 400,
        message: "that name is taken"
      })
    }
    next()
  } catch (err) {
    next(err)
  }
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
