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
  if (!token) return null

  // If token exists...
  const b64 = token.split('.')[1]
  const payload = JSON.parse(atob(b64))
  console.log(payload)
  const now = Date.now() / 1000
  const exp = payload.exp
  if (exp > now){
    return payload.jti
  } else {
    removeToken()
  }
}

export function matchingUser(user){
  const token = getToken()
  if (!token) return null

  const b64 = token.split('.')[1]
  const payload = JSON.parse(atob(b64))
  if (payload.user_id === user){
    return true
  } else {
    return false
  }
}

export function isUserActiveUser(pk){
  if (
    activeUser() && matchingUser(pk) === true
  ) {
    return true
  }
}

// Function to check if user is logged in and which user
export function loginOrProfile(){
  const token = getToken()
  if (!token) {
    return 0
  } else {
    const b64 = token.split('.')[1]
    const payload = JSON.parse(atob(b64))
    if (payload.user_id){
      return payload.user_id
    } else {
      return 0
    }
  }
}

// Function returning true or false based on local storage token
export function doesTokenExist(){
  const token = getToken()
  if (!token) {
    return false
  } else {
    return true
  }
}