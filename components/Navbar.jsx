import React from 'react'
import ShinyText from './ShinyText/ShinyText'

const Navbar = () => {
  return (
    <div className='w-full h-[80px] bg-slate-900 flex items-center border-b-1 border-cyan-500'>
      <div className='ml-6 flex flex-col'>
        <div className='font-mono text-2xl bg-gradient-to-r from-blue-400 via-cyan-500 to-cyan-300 text-transparent bg-clip-text font-bold'>
          Sujay Kumar Giri
        </div>
        <ShinyText 
          text="Full-Stack Developer & Engineer" 
          disabled={false} 
          speed={5} 
          className='text-gray-400 text-md'
        />
      </div>
    </div>
  )
}

export default Navbar
