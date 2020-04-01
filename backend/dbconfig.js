module.exports = {
  development: {
    dialect: "sqlite",
    storage: `${__dirname}/db/source.db`,
    logging: false
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  }
};
