import axios from 'axios'

const email = process.env.REACT_APP_AXIOS_EMAIL
const password = process.env.REACT_APP_AXIOS_PASSWORD


class AccessTechApi {
  constructor(email, password, axios) {
    this.email = email
    this.password = password
    this.source = axios.CancelToken.source
    this.api = axios.create({
      baseURL: "http://accessbills-proxy.herokuapp.com",
      // baseURL: "http://localhost:3001",
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
     return this.api.post('/auth', JSON.stringify(data))
  }

  airtimeInfo(phoneNumber) {
    return this.api.get(`/airtime/info/${phoneNumber}`, this.headers())
  }

}

export default new AccessTechApi(email, password, axios)
