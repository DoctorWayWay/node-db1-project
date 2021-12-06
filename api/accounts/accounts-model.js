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

const create = account => {
  // DO YOUR MAGIC
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
