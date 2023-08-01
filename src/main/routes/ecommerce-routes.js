const RegisterEcommerceComposer = require('../composers/register-ecommerce-router-composer')
const { adapt } = require('../adapters/express-router-adapter')

module.exports = router => {
  router.post('/ecommerce', adapt(RegisterEcommerceComposer.compose()))
}
