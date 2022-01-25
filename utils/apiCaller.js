import axios from 'axios'

const BASE_URL = 'https://haloha-backend.herokuapp.com/api'

/**
 *
 * @param {String} endpoint
 * @param {String} method
 * @param {Object} data
 * @param {Object} headers
 * @returns
 */
const apiCaller = async (endpoint = '', method = 'GET', data = null, headers = {}) => {
  try {
    // validate params
    let params = { endpoint }
    let keys = Object.keys(params)
    for (let i = 0, leng = keys.length; i < leng; i++) {
      if (!params[keys[i]]) {
        throw { message: `Bad request. Field "${axios}" is required` }
      }
    }

    let token = ''

    let axiosConfig = {
      url: BASE_URL + endpoint,
      method,
      data,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }

    let res = await axios(axiosConfig)

    return res.data
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

export default apiCaller
