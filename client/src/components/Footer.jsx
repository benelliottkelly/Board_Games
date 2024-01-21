import { Link } from 'react-router-dom'
import { FaGithubSquare } from "react-icons/fa"


export default function Footer() {
  return (
    <footer>
        <p className='special-characters'>©BenElliottKelly ({new Date().getFullYear()})</p>
        <p>This site is the result of my final project for my Software Engineering Immersive course provided by General Assembly. I hope you enjoy it as much as I enjoyed making it 😊</p>
        <Link className='link' to={'https://github.com/benelliottkelly'} ><FaGithubSquare /> github.com/benelliottkelly</Link>
    </footer>
  )
}