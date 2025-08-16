import Link from "next/link";

import React from 'react'

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  )
}

export default Footer