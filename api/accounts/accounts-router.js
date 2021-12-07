// ===== IMPORTS =====
const router = require('express').Router()
const Accounts = require("./accounts-model")
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware")

router.get('/', async (req, res, next) => {
  try {
    const stuff = await Accounts.getAll()
    res.status(200).json(stuff)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params
    const account = await Accounts.getById(id)
    res.status(200).json(account)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const { name, budget } = req.body;
    const newAccount = await Accounts.create({
      name: name.trim(),
      budget,
    });
    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  const { id } = req.params
  const { name, budget } = req.body
  try {
    const updatedAccount = await Accounts
      .updateById(id, { name: name.trim(), budget })
    res.status(200).json(updatedAccount)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params
    await Accounts.deleteById(id)
    res.status(200).json({
      message: "successfully deleted account"
    })
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: `${err.message}`
  })
})

module.exports = router;
