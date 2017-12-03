import formidable from 'formidable'
import AddressComponent from "../../utils/addressComponent"
import User from '../../models/admin/auth'


class Auth extends AddressComponent {
  constructor() {
    super()
    this.login = this.login.bind(this)
    
  }
  async login(req, res) {
    const form = new formidable.IncomingForm()
    console.log(req, form)
    
    form.parse(req, async (err, fields, files) => {
      console.log(fields, files)
      
      if (err) {
        res.status(400).send({
          status: 0,
          type: 'FROM_DATA_ERROR',
          message: 'Form data error'
        })
      }
      const { username, password } = fields
      User.findOne({username}).then(user => {
        if (user && user.isValidPassword(password)) {
          res.json({user: user.toAuthJSON()})
        }else{
          res.status(400).json({ error: 'username or password is error' })
        }
      })
      
    })
    
  }
}

export default new Auth()