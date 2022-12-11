import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { categories } from '../Utils/data'

import { IoFastFood } from 'react-icons/io5'
import RowContainer from './RowContainer'
import { useStateValue } from '../Context/StateProvider'

const MenuContainer = () => {
   const [filterValue, setFilterValue] = useState("chicken")

   const [{ foodItems }, dispatch] = useStateValue()

   return (
      <section className='w-full my-6' id='menu'>
         <div className="w-full flex flex-col items-center justify-center">
            <p className="text-2xl text-headingColor font-semibold capitalize relative
               before:absolute before:rounded-lg before:content before:w-32 before:h-1 
               before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-200 to-orange-600 transition-all ease-in-out 
               duration-100 mr-auto"
            >
               Our Hot Dishes
            </p>
            <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
               {categories && categories.map(category => (
                  <motion.div
                     whileTap={{ scale: 0.75 }}
                     key={category.id}
                     className={`group ${filterValue === category.urlParamName ? 'bg-cartNumBg' : 'bg-card'} 
                     w-24 min-2-[94px] h-28 rounded-xl drop-shadow-xl cursor-pointer hover:bg-cartNumBg flex flex-col items-center gap-3 justify-center`}
                     onClick={() => setFilterValue(category.urlParamName)}
                  >
                     <div
                        className={`${filterValue === category.urlParamName ? 'bg-card' : 'bg-cartNumBg'} 
                        w-10 h-10 rounded-full bg-cartNumBg group-hover:bg-card shadow-lg flex items-center justify-center`}
                     >
                        <IoFastFood
                           className={`${filterValue === category.urlParamName ? 'text-textColor' : 'text-white'} 
                           text-lg group-hover:text-textColor`}
                        />
                     </div>
                     <p
                        className={`${filterValue === category.urlParamName ? 'text-white' : 'text-textColor'} 
                        text-sm group-hover:text-white`}
                     >
                        {category.name}
                     </p>
                  </motion.div>
               ))}
            </div>
            <div className="w-full">
               <RowContainer flag={true} data={foodItems?.filter(n => n.category === filterValue)} />
            </div>
         </div>
      </section>
   )
}

export default MenuContainer