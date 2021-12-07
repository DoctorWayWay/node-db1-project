// ===== IMPORTS =====
const db = require("../../data/db-config")

const getAll = async () => {
  const allAccounts = await db("accounts")
    .select("name", "budget")
  return allAccounts
}

const getById = async id => {
  const [account] = await db("accounts")
    .select("name", "budget")
    .where("id", "=", id)
  return account
}

const create = async account => {
  const [accountID] = await db("accounts")
    .insert(account)
  const newAccount = await getById(accountID)
  return newAccount
}

const updateById = async (id, account) => {
  await db("accounts")
    .update(account)
    .where({ id: id })
  const updatedAccount = await getById(id)
  return updatedAccount
}

const deleteById = async id => {
  await db("accounts")
    .where({ id: id })
    .del()
  return
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
