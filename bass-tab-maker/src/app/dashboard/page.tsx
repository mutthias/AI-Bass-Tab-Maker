"use client";

import React from 'react'
import TabCard from '@/components/TabCard'
import score from '../../../public/scoredummy.png'
import {useEffect, useState } from 'react'
import test_data from "../../../test-data/testdata.json"


const page = () => {
  const [tabs, setTabs] = useState([]);
  const [search, setSearch] = useState('')

// useEffect(() => {
//   fetch("http://localhost:8080/tabSaver").then(
//     response => response.json()
//   ).then(
//     data => {
//       console.log(data);
//       setTabs(data.message);
//     }
//   )
// }, [])
  const AddTab = async () => {
    try {
      const res = await fetch("http://localhost:8080/tabSaver/add_tab");
      const data = await res.json();
      setTabs(data);
    } catch (e) {
      setTabs([]);
    }
  }

  return (
    <div className='p-0 sm:p-16 md:p-32 flex justify-center'>
      <section className='flex flex-col items-left w-full max-w-[1400px]'>

        <h1 className='text-3xl mb-12 font-bold'>
          Your Saved sheets:
        </h1>
        
        <div className='py-2'>
          <button className='cursor-pointer px-4 py-1 bg-green-300 hover:bg-green-400 rounded-2xl transition'>
            Add new tab
          </button>
        </div>

        <div className='w-full flex mb-8'>
          <input
            placeholder='Search tablature...'
            type='text'
            className='w-full px-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-8'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className='grid gap-12 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-w-[1400px] w-full place-items-center'>
          {test_data.filter((card) => {
            return search.toLowerCase().trim() === "" ? card : card.artist.toLowerCase().includes(search)
          }).map((card, index) => (
            <TabCard 
              key={index} 
              title={card.title} 
              artist={card.artist} 
              image_src={score}
              width={card.width}
              height={card.height}
              />
          ))}
        </div>

      </section>
    </div>
  )
}

export default page