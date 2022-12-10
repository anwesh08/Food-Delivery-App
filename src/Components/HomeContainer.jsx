import React from 'react'

import Delivery from '../img/delivery.png'
import Herobg from '../img/heroBg.png'

import { heroData } from '../Utils/data'

const HomeContainer = () => {
   return (
      <section id='home' className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
         <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
            <div className='flex items-center justify-center gap-2 bg-orange-100 px-4 py-1 rounded-full'>
               <p className="text-base text-orange-500 font-bold">Bike Delivery</p>
               <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
                  <img src={Delivery} alt="delivery" className='w-full h-full object-contain' />
               </div>
            </div>
            <p className="text-[3.5rem] lg:text-[6rem] font-bold tracking-wide text-headingColor">
               The Fastest Delivery in{" "}
               <span className="text-[4rem] lg:text-[7rem] text-orange-600">
                  Your City
               </span>
            </p>
            <p className='md:w-[80%] text-base text-textColor text-center md:text-left'>
               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, tempore. Esse, officiis. Eos optio necessitatibus cumque, iste, consectetur eum ea voluptates eius possimus sit quis unde quisquam harum sapiente vero!
            </p>
            <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-xl md:rounded-full hover:shadow-lg transition-all ease-in-out duration-100 text-white font-bold'>Order Now</button>
         </div>
         <div className='py-2 flex-1 flex items-center relative'>
            <img src={Herobg} alt="hero-bg" className="ml-auto h-420 w-full lg:w-[60%] lg:h-650" />
            <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-40 py-8 gap-10 flex-wrap'>
               {heroData && heroData.map((n) => (
                  <div key={n.id} className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg">
                     <img src={n.imageSrc} alt={n.name} className='w-20 -mt-10 lg:w-40 lg:-mt-20' />
                     <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                        {n.name}
                     </p>
                     <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                        {n.decp}
                     </p>
                     <p className="text-sm font-semibold text-headingColor">
                        <span className="text-xs text-red-600">$</span> {n.price}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default HomeContainer