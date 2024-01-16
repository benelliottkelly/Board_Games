import axios from 'axios'
import { formToObj, getToken } from '../helpers/common'

export async function createGenre(request){
  const data = await formToObj(request)
  return await axios.post(`/api/genres/`, data, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}