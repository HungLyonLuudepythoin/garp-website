import React from 'react'

const Introduction = () => {
  return (
    <div className='flex md:flex-row max-md:flex-col my-20 md:mr-36'>
      <div className='md:w-1/2 text-2xl xl:text-3xl'>
        <p className='mx-6 mb-10 font-semibold'>
          Let me introduce
        </p> 
        
      </div>
      <div className="flex flex-col md:w-1/2 max-md:mx-6">
        <h1 className='font-bold pb-16 max-sm:pb-10 max-md:text-5xl md:text-5xl xl:text-6xl'>
          Garp: Your All in One Delivery Solution
        </h1>
        <p className='indent-2 text-gray-700 text-xl xl:text-2xl mr-10'>
          Introducing Garp, your ultimate delivery companion inspired by 
          the efficiency of Grab! Whether you need food, groceries, or even quick errands handled, 
          Garp has you covered with lightning-fast service and unbeatable convenience. Designed to simplify your life, 
          Garp connects you with trusted local providers, ensuring quality and reliability every step of the way.
          With user-friendly features and a seamless experience, Garp makes every delivery stress-free and enjoyable. 
          Discover the future of delivery with Garp—your needs, just a tap away!
        </p>
      </div>
    </div>
  )
}

export default Introduction