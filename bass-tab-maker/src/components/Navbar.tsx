import Link from "next/link";
import Image from "next/image";

import React from 'react'

import logo from '../../public/githublogo.png'


const Navbar = () => {
  return (
    <nav className="bg-gray-400 px-8 py-7 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <Link href="https://github.com/mutthias/AI-Bass-Tab-Maker" target="_blank">
          <Image
            src={logo}
            width={40}
            alt="View on Github"
            >
          </Image>
        </Link>
      </div>

      <div className="flex items-center">
        <ul className="flex space-x-8">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="">View on Github</Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar