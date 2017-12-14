import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burger-app-4efde.firebaseio.com/'
})

export default instance