const tokenName = 'BOARD-GAME-TOKEN'

// Takes the request object and returns it as an object
export async function formToObj(request){
  const formData = await request.formData()
  return Object.fromEntries(formData.entries())
}

// Save JWT Token to local storage
export function setToken(token){
  localStorage.setItem(tokenName, token)
}

// Get JWT Token from local storage
export function getToken(){
  return localStorage.getItem(tokenName)
}

// Remove the JWT Token from local storage
export function removeToken(){
  localStorage.removeItem(tokenName)
}

export function activeUser(){
  const token = getToken()
  // If there is no token, return null
  if (!token) return Null

  // If token exists...
  const b64 = token.split('.')[1]
  const payload = JSON.parse(atob(b64))

  const now = Date.now() / 1000
  const exp = payload.exp
  if (exp > now){
    return payload.sub
  } else {
    removeToken()
  }
}