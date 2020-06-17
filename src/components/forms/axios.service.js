import axios from 'axios'

const email = process.env.REACT_APP_AXIOS_EMAIL
const password = process.env.REACT_APP_AXIOS_PASSWORD


class AccessTechApi {
  constructor(email, password, axios) {
    this.email = email
    this.password = password
    this.source = axios.CancelToken.source
    this.api = axios.create({
      baseURL: "http://104.200.21.110:8181/api",
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.token = this.authenticate()
    this.headers = {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${this.token}`
      }
    }
  }

  authenticate() {
    const data = {username: this.email, password: this.password}
    this.api.post('/merchant/auth', JSON.stringify(data)).then(response => {
      console.log(response.data);
      return response.data.token
    }).catch(error => console.log(error))
  }

  airtimeInfo(phoneNumber) {
    return this.api.get(`airtime/info/${phoneNumber}`, this.headers)
  }

}

export default new AccessTechApi(email, password, axios)
