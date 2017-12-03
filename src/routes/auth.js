import express from 'express'
import multer from 'multer'
import User from '../models/user/auth'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './images')
  },
  filename(req, file, cb) {
    const fileFormat = file.originalname.split('.')
    cb(
      null,
      `${file.fieldname}-${Date.now()}.${fileFormat[fileFormat.length - 1]}`,
    )
  },
})
const upload = multer({
  storage,
}).single('file')
router.post('/signup', (req, res) => {
  const { username, password } = req.body.credentials

  const user = new User({ username })
  user.setPassword(password)
  user.setConfirmationToken()
  user
    .save()
    .then(userRecord => {
      res.json({ user: userRecord.toAuthJSON() })
    })
    .catch(err => res.status(400).json({ err }))
})

router.post('/login', (req, res) => {
  const { credentials: { username, password } } = req.body
  User.findOne({ username }).then(user => {
    if (user && user.isValidPassword(password)) {
      res.json({ user: user.toAuthJSON() })
    } else {
      res.status(400).json({ error: 'username or password is error' })
    }
  })
})

router.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.status(400).json({ error: 'something wrong' })
    }
    return res.json({ message: 'file success' })
  })
})
export default router
 