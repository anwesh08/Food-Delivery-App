import React, { useEffect, useRef, useState } from 'react'

import { MdShoppingBasket } from 'react-icons/md'

import { motion } from 'framer-motion'

import NotFound from '../img/NotFound.svg'

import { useStateValue } from '../Context/StateProvider'
import { actionType } from '../Context/reducer'

const RowContainer = ({ flag, data, scrollValue }) => {
   const rowContainerRef = useRef()

   const [items, setItems] = useState([])

   const [{ cartItems }, dispatch] = useStateValue()

   const addToCart = (item) => {
      dispatch({
         type: actionType.SET_CART_ITEMS,
         cartItems: items
      })
      localStorage.setItem("cartItems", JSON.stringify(items));
   }

   useEffect(() => {
      rowContainerRef.current.scrollLeft += scrollValue
   }, [scrollValue])

   useEffect(() => {
      addToCart()
   },[items])

   return (
      <div ref={rowContainerRef} className={`w-full h-full flex items-center gap-3 mt-12 my-4 scroll-smooth ${flag ? 'overflow-x-scroll scrollbar-none overflow-y-hidden' : 'overflow-x-hidden flex-wrap justify-center'}`}>
         {data && data.length > 0 ? (
            data.map(item => (
               <div key={item.id} className="w-300 h-auto min-w-[300px] md:w-340 md:min-w-[340px] my-12 bg-cardOverlay backdrop-blur-lg rounded-xl p-2 hover:drop-shadow-lg flex flex-col items-center justify-between">
                  <div className="w-full flex items-center justify-between">
                     <motion.div whileHover={{scale: 1.2}} className='w-44 h-44 -mt-8 drop-shadow-2xl'>
                        <img
                           src={item?.imageURL}
                           alt=""
                           className='w-full h-full object-contain'
                        />
                     </motion.div>
                     <motion.div 
                        whileTap={{ scale: 0.75 }} 
                        onClick={() => setItems([...cartItems, item])}
                        className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                     >
                        <MdShoppingBasket className='text-white' />
                     </motion.div>
                  </div>
                  <div className="w-full flex flex-col items-end justify-end">
                     <p className="text-textColor font-semibold text-base md:text-lg">
                        {item?.title}
                     </p>
                     <p className="mt-1 text-sm text-gray-500">
                        {item?.calories}
                     </p>
                     <div className="flex items-center gap-8">
                        <p className="text-lg text-headingColor font-semibold">
                           <span className='text-sm text-red-500'>$</span> {item?.price}
                        </p>
                     </div>
                  </div>
               </div>
            ))
         ) : (
         <div className='w-full flex flex-col items-center justify-center'>
            <img src={NotFound} className="h-[400px] w-[400px]" alt="" />
            <p className='text-xl text-headingColor my-2 font-semibold'>Item Not Available</p>
         </div>)}
      </div>
   )
}

export default RowContainer