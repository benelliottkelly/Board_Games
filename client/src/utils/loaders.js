import axios from 'axios'

export async function singleUserLoader(userpk){
  const res = await fetch(`/api/users/${userpk}/`)
  return res.json()
}

export async function boardGamesLoader(){
  const res = await fetch(`/api/boardgames/`)
  const boardgames = await res.json()
  const res2 = await fetch(`/api/genres/`)
  const genres = await res2.json()
  return { boardgames, genres}
}

export async function singleBoardGameLoader(boardgamepk){
  const res = await fetch(`/api/boardgames/${boardgamepk}/`)
  const boardGame = await res.json()
  const res2 = await fetch(`/api/genres/`)
  const genres = await res2.json()
  return { boardGame, genres}
}

export async function genresLoader(){
  const res = await fetch(`/api/genres/`)
  return res.json()
}

export async function singleGenreLoader(genrepk){
  const res = await fetch(`/api/genre/${genrepk}/`)
  return res.json()
}