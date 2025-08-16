"use client"

import React, { useEffect, useState } from 'react'


function page() {

  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    fetch("http://localhost:8080/api/home").then(
      response => response.json()
    ).then(
      data => {
        console.log(data)
        setMessage(data.message)
      }
    )
  }, [])
  return (
    <div className='flex flex-col'>
      <section className='relative h-screen w-screen'>
        <video 
          className='absolute top-0 left-0 w-full h-full object-cover'
          src="./thundercat.mp4"
          autoPlay
          loop
          playsInline
          muted
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
      </section>

      <section className='py-10 bg-gray-300'>
          <p>{message || "Loading..."}</p>

      </section>

    </div>
  )
}

export default page