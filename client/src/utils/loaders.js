import axios from 'axios'

export async function singleUserLoader(userpk){
  const res = await fetch(`/api/users/${userpk}/`)
  const user = await res.json()
  const res2 = await fetch(`/api/boardgames/`)
  const boardgames = await res2.json()
  const res3 = await fetch(`/api/gamesowned/`)
  const gamesowned = await res3.json()
  const res4 = await fetch(`/api/reviews/`)
  const reviews = await res4.json()
  return { user , boardgames, gamesowned, reviews}
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