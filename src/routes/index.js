import auth from "./auth"
import shop from "./shop"

export default app => {
  app.use('/shop', shop)
  app.use('/auth', auth)
}