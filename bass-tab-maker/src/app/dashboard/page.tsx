import React from 'react'
import TabCard from '@/components/TabCard'
import score from '../../../public/scoredummy.png'

const page = () => {
  const temp_cards = [
    {
      title: 'I can Tell',
      artist: 'Giveon',
      image_src: score,
      width: 'w-64',
      height: 'h-72'
    }, 
    {
      title: 'I can Tell',
      artist: 'Giveon',
      image_src: score,
      width: 'w-64',
      height: 'h-72'
    },
    {
      title: 'I can Tell',
      artist: 'Giveon',
      image_src: score,
      width: 'w-64',
      height: 'h-72'
    }
  ]
  return (
    <div className='p-8 flex justify-center'>
      <div className='flex justify-center flex-wrap gap-32'>
        {temp_cards.map((card, index) => (
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
    </div>
  )
}

export default page