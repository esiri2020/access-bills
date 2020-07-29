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

  async dataInfo(phoneNumber) {
    return this.api.get(`/data/info/${phoneNumber}`, this.headers())
  }

  async utilityInfo() {
    return this.api.get('/utility/info', this.headers())
  }

  async utilityTopUp(data) {
    return this.api.get('/utility/topup', JSON.stringify(data), this.headers())
  }

}

export default new AccessTechApi(email, password, axios)
