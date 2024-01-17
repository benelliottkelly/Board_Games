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
  // const data = await formToObj(request)
  const data = request
  if (data.genre) {
    data.genre = data.genre.split(',')
  }
  console.log('Patch data -> ', data)
  return await axios.patch(`/api/boardgames/${pk}/`, data, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function deleteBoardGame(pk){
  await axios.delete(`/api/boardgames/${pk}/`, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return redirect('/api/boardgames')
}