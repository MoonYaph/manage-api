import formidable from 'formidable'
import path from 'path'
import fs from 'fs'
import gm from 'gm'
import Ids from '../models/Id'

class BaseComponent {
  constructor() {
    this.idList = [
      'restaurant_id',
      'food_id',
      'order_id',
      'address_id',
      'cart_id',
      'img_id',
      'category_id',
      'item_id',
      'user_id'
    ]
  }
  async fetch(url = '', data = {}, type = 'GET', resType = 'JSON') {
    type = type.toUpperCase()
    resType = resType.toUpperCase()
    if (type === 'GET') {
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += `${key}=${data[key]}&`
      })

      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = `${url}?${dataStr}`
      }
    }

    const requestConfig = {
      method: type,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }

    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }
    let responseJson
    try {
      const response = await fetch(url, requestConfig)
      if (resType === 'TEXT') {
        responseJson = await response.text()
      } else {
        responseJson = await response.json()
      }
    } catch (err) {
      console.log('获取http数据失败', err)
      throw new Error(err)
    }
    return responseJson
  }
  /**
   * get the id of id list
   * @param {String} type
   */
  async getId(type) {
    if (!this.idList.includes(type)) {
      throw new Error("The 'id' type is not valid!")
    }
    try {
      const id = await Ids.findOne()
      id[type]++
      await id.save()
      return id[type]
    } catch (error) {
      throw new Error(error)
    }
  }
  async uploadImg(req, res) {
    try {
      const imagePath = await this.getPath(req)
      res.send({
        image_path: imagePath
      })
    } catch (error) {
      res.status(400).json({
        status: 0,
        type: 'ERROR_UPLOAD_IMG',
        message: 'Fail to upload image'
      })
    }
  }
  async getPath(req) {
    return new Promise((resolve, reject) => {
      const form = formidable.IncomingForm()
      form.uploadDir = './images'
      form.parse(req, async (err, fields, files) => {
        let imgId
        try {
          imgId = await this.getId('img_id')
        } catch (error) {
          fs.unlink(files.file.path)
          throw new Error('Fail to get the image id')
        }

        const imgName =
          (new Date().getTime() + Math.ceil(Math.random() * 10000)).toString(
            16
          ) + imgId
        const fullName = imgName + path.extname(files.file.name)
        const rePath = `./iamges/${fullName}`
        try {
          await fs.rename(files.file.path, rePath)
          gm(rePath)
            .resize(200, 200, '1')
            .write(rePath, async e => {
              if (e) {
                throw new Error('Fail to cut the image')
              }
              resolve(fullName)
            })
        } catch (error) {
          fs.unlink(files.file.path)
          console.log('Fail to save image')
          reject(error)
        }
      })
    })
  }
}

export default BaseComponent
