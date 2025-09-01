"use client"

import React, { useEffect, useState } from 'react'
import LoginForm from '@/components/LoginForm'


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
    <div className='flex flex-col h-screen'>
      <section className='relative h-1/2 w-screen flex items-center justify-center text-center'>
        <video 
          className='absolute top-0 left-0 w-full h-full object-cover'
          src="./thundercat.mp4"
          autoPlay
          loop
          playsInline
          muted
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
        
        <div className='relative z-10 text-white'>
          <h1 className='text-6xl font-bold'>AI Bass Tab Creator</h1>
          <h2 className='text-lg mt-4'>Upload your favorite songs and get Musescore tabs using AI!</h2>
        </div>

      </section>

      <section className='py-10'>
          <LoginForm />
      </section>

    </div>
  )
}

export default page