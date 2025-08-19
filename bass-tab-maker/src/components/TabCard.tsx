import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface TabCardProps {
  title: string;
  artist: string;
  image_src: string | StaticImageData;
  width?: string;
  height?: string;
}

const TabCard: React.FC<TabCardProps> = ({ title, artist, image_src, width, height }) => {
  return (
    <div className={`rounded-2xl shadow-lg overflow-hidden ${width} ${height} flex flex-col`}>

      <div className='flex-none p-4 bg-white' style={{flexBasis: "20%"}}>
        <h2 className='text-lg font-bold'>{title}</h2>
        <p className='text-sm text-gray-500'>{artist}</p>
      </div>

      <div className='flex-1 relative' style={{flexBasis: "80%"}}>
        <Image
          src={image_src}
          alt={title}
          fill
          className='object-cover'
        />
      </div>
    </div>
  )
}

export default TabCard