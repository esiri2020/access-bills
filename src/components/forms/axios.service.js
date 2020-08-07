import axios from 'axios'

const email = process.env.REACT_APP_AXIOS_EMAIL
const password = process.env.REACT_APP_AXIOS_PASSWORD


class AccessTechApi {
  constructor(email, password, axios) {
    this.email = email
    this.password = password
    this.source = axios.CancelToken.source
    this.api = axios.create({
      // baseURL: "http://accessbills-proxy.herokuapp.com",
      // baseURL: "http://localhost:3001",
      baseURL: "http://104.200.21.110:8181/api",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
    this.authenticate().then(response => {
     // console.log(response.data);
     this.token = response.data.token
   }).catch(error => console.log(error))
    // console.log(this.token);
  }

  headers() {
    return {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.token}`
      }
    }
  }

  async authenticate() {
    const data = {username: this.email, password: this.password}
     return this.api.post('/merchant/auth', JSON.stringify(data))
  }

  async airtimeInfo(phoneNumber) {
    return this.api.get(`/airtime/info/${phoneNumber}`, this.headers())
  }

  async airtimeTopup(phoneNumber, data) {
    return this.api.post(`/airtime/topup/${phoneNumber}`, JSON.stringify(data), this.headers())
  }

  async dataInfo(phoneNumber) {
    return this.api.get(`/data/info/${phoneNumber}`, this.headers())
  }

  async dataTopup(phoneNumber, data) {
    return this.api.post(`/data/topup/${phoneNumber}`, JSON.stringify(data), this.headers())
  }

  async utilityInfo() {
    return this.api.get('/utility/info', this.headers())
  }

  async utilityTopUp(data) {
    return this.api.post('/utility/topup', JSON.stringify(data), this.headers())
  }

  async tvInfo() {
    return this.api.get('/cable/info', this.headers())
  }

  async smartCardInfo(number) {
    return this.api.get(`/cable/smartcard/info/${number}`, this.headers())
  }

  async renewDstv(number) {
    return this.api.post(`/cable/smartcard/topup/${number}`, this.headers())
  }

  async newDstvPackage(number, data) {
    return this.api.post(`/cable/dstv/topup/${number}`, JSON.stringify(data), this.headers())
  }

  async dstvWalletTopup(number, data) {
    return this.api.post(`/cable/dstv/topup/${number}`, JSON.stringify(data), this.headers())
  }

  async dstvTopup(tvPackage, data) {
    return this.api.post(`/cable/dstv/topup/${tvPackage}`, JSON.stringify(data), this.headers())
  }

  async spectranetPlans() {
    return this.api.get('/internet/spectranet/packages', this.headers())
  }

  async spectranetTopup(code, data) {
    return this.api.post(`internet/spectranet/topup/${code}`, JSON.stringify(data), this.headers())
  }

  async smilePlans() {
    return this.api.get('/internet/smile/packages', this.headers())
  }

  async smileTopup(code, data) {
    return this.api.post(`internet/smile/topup/${code}`, JSON.stringify(data), this.headers())
  }

  async examInfo(type) {
    if (type === 'jamb') {
      return this.api.get('/exam/jamb/info', this.headers())
    } else {
      return this.api.get('/exam/waec/info', this.headers())
    }
  }

  async examPin(type, code) {
    const data = { quantity: 1 }
    if (type === 'jamb') {
      return this.api.post(`exam/jamb/pin/${code}`, JSON.stringify(data), this.headers())
    } else {
      return this.api.post(`exam/waec/pin/${code}`, JSON.stringify(data), this.headers())
    }
  }

}

export default new AccessTechApi(email, password, axios)
