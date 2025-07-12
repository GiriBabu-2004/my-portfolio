  import React from 'react'
  import Lanyard from './Lanyard/Lanyard.jsx'



  const LeftSection = () => {
    return (
      <div className='border-r-1 border-cyan-500 h-full bg-gradient-to-b from-slate-800 to-black'>
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>
    )
  }

  export default LeftSection
