import axios from 'axios'

export async function singleUserLoader(userpk){
  const res = await fetch(`/api/users/${userpk}/`)
  return res.json()
}

export async function boardGamesLoader(){
  const res = await fetch(`/api/boardgames/`)
  return res.json()
}

export async function singleBoardGameLoader(boardgamepk){
  const res = await fetch(`/api/boardgames/${boardgamepk}`)
  return res.json()
}

export async function genresLoader(){
  const res = await fetch(`/api/genre/`)
  return res.json()
}

export async function singleGenreLoader(genrepk){
  const res = await fetch(`/api/genre/${genrepk}`)
  return res.json()
}