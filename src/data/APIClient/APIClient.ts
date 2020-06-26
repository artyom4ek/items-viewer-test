import axios, { AxiosInstance } from 'axios'

export default class APIClient {
  private baseURL: string

  private axios: AxiosInstance

  constructor(baseURL: string) {
    this.baseURL = baseURL
    if (this.baseURL[this.baseURL.length - 1] !== '/') {
      this.baseURL += '/'
    }

    this.axios = axios.create({
      baseURL: this.baseURL,
      timeout: 20 * 1000
    })
  }
}
