import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

import HomeContainer from './HomeContainer'
import RowContainer from './RowContainer'
import { useStateValue } from '../Context/StateProvider'
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'

const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue()

  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow])

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer />
      <section className='w-full my-6'>
        <div className='w-full items-center justify-between flex'>
          <p className="text-2xl text-headingColor font-semibold capitalize relative
              before:absolute before:rounded-lg before:content before:w-32 before:h-1 
              before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-200 to-orange-600 transition-all ease-in-out 
              duration-100"
          >
            Our Fresh & Healthy Fruits
          </p>
          <div className='hidden md:flex items-center gap-3'>
            <motion.div
              onClick={() => setScrollValue(-200)}
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-xl bg-orange-300 hover:bg-orange-500 hover:shadow-lg cursor-pointer flex items-center justify-center"
            >
              <MdChevronLeft className='text-xl text-white' />
            </motion.div>
            <motion.div
              onClick={() => setScrollValue(200)}
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-xl bg-orange-300 hover:bg-orange-500 hover:shadow-lg cursor-pointer flex items-center justify-center"
            >
              <MdChevronRight className='text-xl text-white' />
            </motion.div>
          </div>
        </div>
        <RowContainer scrollValue={scrollValue} flag={true} data={foodItems?.filter(n => n.category === 'fruits')} />
      </section>
      <MenuContainer />
      {cartShow && (
        <CartContainer />
      )}
    </div>
  )
}

export default MainContainer