import BaseComponent from "./baseComponent"


class AddressComponent extends BaseComponent {
  constructor() {
    super()
    this.tencentKey = 'TB4BZ-M6DKF-S4SJ2-JPCHH-22K5F-J6BFH'
  }
  // https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
  async guessPosition (req) {
    return new Promise(async (resolve, reject) => {
      let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
      const ipArr = ip.splie(':')
      ip = ipArr[ipArr.length - 1]
      if (process.env.NODE_ENV === 'development') {
        ip = '116.226.184.83'
      }
      try {
        const result = await this.fetch('http://apis.map.qq.com/ws/location/v1/ip', {ip, key: this.tencentKey})
        if (result.status !== 0) {
          throw new Error('The key is not valid! Try another valid key')
        }
        const cityInfo = {
          lat: result.result.location.lat,
          lng: result.result.location.lng,
          city: result.result.ad_info.city,
        }
        resolve(cityInfo)
      } catch (error) {
        console.log('Fail to location')
        reject(error)
      }
    })
  }
  async searchPlace(keyword, cityName) {
    try {
      const result = await this.fetch('http://apis.map.qq.com/ws/place/v1/search', {
        key: this.tencentKey,
        keyword: encodeURIComponent(keyword),
        boundary: `region(${encodeURIComponent(cityName)}, 0)`,
        page_size: 10,
      })
      if (result.status === 0) {
        return result
      }
      throw new Error('Fail to search place')
    } catch (error) {
      throw new Error(error)
    }
  }
  async geocoder(req) {
    try {
      const address = await this.guessPosition(req)
      const res = await this.fetch('http://apis.map.qq.com/ws/geocoder/v1/', {
        key: this.tencentkey,
        location: `${address.lat},${address.lng}`,
      })
      if (res.status === 0) {
        return res
      }
      throw new Error('获取具体位置信息失败')
    } catch (err) {
      console.log('geocoder获取定位失败')
      throw new Error(err)
    }
  }
  async getpois(lat, lng) {
    try {
      const res = await this.fetch('http://apis.map.qq.com/ws/geocoder/v1/', {
        key: this.tencentkey,
        location: `${lat  },${  lng}`,
      })
      if (res.status === 0) {
        return res
      }
      throw new Error('通过获geohash取具体位置失败')
    } catch (err) {
      console.log('getpois获取定位失败')
      throw new Error(err)
    }
  }
}

export default AddressComponent