import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import EmptyCart from '../img/emptyCart.svg'

import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from 'react-icons/ri'

import { actionType } from '../Context/reducer'
import { useStateValue } from '../Context/StateProvider'
import CartItem from './CartItem'

const CartContainer = () => {
   const [{ cartShow, cartItems, user }, dispatch] = useStateValue()

   const [flag, setFlag] = useState(1);
   const [tot, setTot] = useState(0);

   const showCart = () => {
      dispatch({
         type: actionType.SET_CART_SHOW,
         cartShow: !cartShow,
      })
   }

   useEffect(() => {
      let totalPrice = cartItems.reduce(function (accumulator, item) {
        return accumulator + item.qty * item.price;
      }, 0);
      setTot(totalPrice);
      console.log(tot);
    }, [tot, flag]);

    const clearCart = () => {
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: [],
      });
  
      localStorage.setItem("cartItems", JSON.stringify([]));
    };

   
   return (
      <motion.div
         initial={{ opacity: 0, x: 200 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: 200 }}
         className='w-full fixed top-0 right-0 md:w-375 h-screen z-[101] bg-white shadow-md flex flex-col'>
         <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
            <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
               <MdOutlineKeyboardBackspace className='text-3xl text-textColor' />
            </motion.div>
            <motion.p whileTap={{ scale: 0.75 }} className="text-textColor text-lg font-semibold">Cart</motion.p>
            <motion.p onClick={clearCart} whileTap={{ scale: 0.75 }} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-lg hover:shadow-md cursor-pointer text-base text-textColor'>
               Clear <RiRefreshFill /> {" "}
            </motion.p>
         </div>
         {/* Bottom Section */}
         {cartItems && cartItems.length > 0 ? (
            <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
               <div className="w-full h-340 mh:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                  {/* Cart Item */}
                  {cartItems && cartItems.length > 0 && cartItems.map(item => (
                     <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag} />
                  ))}
               </div>
               {/* Cart Total Section */}
               <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                  <div className="w-full flex items-center justify-between">
                     <p className="text-gray-400 text-lg">Sub Total</p>
                     <p className="text-gray-400 text-lg">$ {tot}</p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                     <p className="text-gray-400 text-lg">Delivery</p>
                     <p className="text-gray-400 text-lg">$ 2.99</p>
                  </div>
                  <div className="w-full border-b border-gray-600 my-2">

                  </div>
                  <div className='w-full flex items-center justify-between'>
                     <p className='text-gray-200 text-xl font-semibold'>Total</p>
                     <p className='text-gray-200 text-xl font-semibold'>$ {tot + 2.99}</p>
                  </div>
                  {user ? (
                     <motion.button
                        whileTap={{ scale: 0.8 }}
                        type='button'
                        className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-300 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg'
                     >
                        Check Out
                     </motion.button>
                  ) : (
                     <motion.button
                        whileTap={{ scale: 0.8 }}
                        type='button'
                        className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-300 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg'
                     >
                        Login to Check Out
                     </motion.button>
                  )}
               </div>
            </div>
         ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
               <img src={EmptyCart} className="w-300" alt="Empty Cart" />
               <p className="text-xl text-textColor font-semibold">
                  Add some items to your cart
               </p>
            </div>
         )}

      </motion.div>
   )
}

export default CartContainer