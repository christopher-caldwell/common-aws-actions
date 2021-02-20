const { variables } = require('./env.json')

module.exports = () => {
  variables.forEach(({ name, value }) => {
    process.env[name] = value
  })
}
