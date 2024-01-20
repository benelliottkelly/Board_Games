import axios from 'axios'
import { formToObj, getToken } from '../helpers/common'
import { redirect } from 'react-router-dom'

export async function createBoardGame(request){
  const data = await formToObj(request)
  data.genre = data.genre.split(',')
  return await axios.post(`/api/boardgames/`, data, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function editBoardGame(request, pk){
  const data = request
  if (data.genre) {
    data.genre = data.genre.split(',')
  }
  const res = await axios.patch(`/api/boardgames/${pk}/`, data, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return res
}

export async function deleteBoardGame(pk){
  const res = await axios.delete(`/api/boardgames/${pk}/`, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return res
}

export async function addBoardGameToCollection(request){
  const data = request
  data.quantity = parseInt(data.quantity)
  const res = await axios.post(`/api/gamesowned/`, data, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  console.log('Res from add to collection', res)
  return res
}

export async function editBoardGameInCollection(request){
  const data = request
  data.quantity = parseInt(data.quantity)
  const rest = await axios.patch(`/api/gamesowned/`, data, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}