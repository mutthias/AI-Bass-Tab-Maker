"use client";

import React from 'react'
import TabCard from '@/components/TabCard'
import score from '../../../public/scoredummy.png'
import { useState } from 'react'

const page = () => {
  const [search, setSearch] = useState('');
  const temp_cards = [
    {
      title: 'I can Tell',
      artist: 'Giveon',
      image_src: score,
      width: 'w-64',
      height: 'h-72'
    }, 
    {
      title: `Vibes don't Lie`,
      artist: 'Leon Thomas',
      image_src: score,
      width: 'w-64',
      height: 'h-72'
    },
    {
      title: 'Rather Be',
      artist: 'Giveon',
      image_src: score,
      width: 'w-64',
      height: 'h-72'
    },
    {
      title: 'Is it a Crime',
      artist: 'Sade',
      image_src: score,
      width: 'w-64',
      height: 'h-72'
    },
    {
      title: 'Marvin Gaye',
      artist: `What's Going On`,
      image_src: score,
      width: 'w-64',
      height: 'h-72'
    },
    {
      title: 'N Side',
      artist: 'Steve Lacy',
      image_src: score,
      width: 'w-64',
      height: 'h-72'
    }
  ];

  return (
    <div className='p-0 sm:p-16 md:p-32 flex justify-center'>

      <section className='flex flex-col items-left w-full max-w-[1400px]'>

        <h1 className='text-2xl mb-12'>
          Your Saved sheets:
        </h1>

        <div className='w-full flex mb-8'>
          <input
            placeholder='Search tablature...'
            type='text'
            className='w-full px-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-8'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className='grid gap-12 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-w-[1400px] w-full place-items-center'>
          {temp_cards.filter((card) => {
            return search.toLowerCase().trim() === "" ? card : card.artist.toLowerCase().includes(search)
          }).map((card, index) => (
            <TabCard 
              key={index} 
              title={card.title} 
              artist={card.artist} 
              image_src={card.image_src}
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