import React, { useState } from 'react'

import { MdShoppingCart, MdAdd, MdLogout, MdHome, MdOutlineRestaurantMenu, MdRoomService } from 'react-icons/md'
import { HiUsers } from 'react-icons/hi'

import { motion } from 'framer-motion'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'

import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'

import { Link } from 'react-router-dom'

import { useStateValue } from '../Context/StateProvider';
import { actionType } from '../Context/reducer';

function Header() {
  // Login Authentication
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const [{ user }, dispatch] = useStateValue()

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      })
      localStorage.setItem("user", JSON.stringify(providerData[0]))
    } else {
      setIsMenu(!isMenu)
    }
  }

  const logout = () => {
    setIsMenu(false)
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null
    })
  }

  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>
      {/* desktop & tablet */}
      <div className='hidden md:flex items-center justify-between'>
        {/* Brand Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="" className='object-cover w-10' />
          <p className='text-headingColor text-xl font-bold'>City</p>
        </Link>
        {/* NavBar */}
        <div className='flex items-center gap-8'>
          {/* NavBar Items */}
          <motion.ul initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }} className='flex items-center gap-24'>
            <Link to={'/'} className='text-xl text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</Link>
            <li className='text-xl text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
            <li className='text-xl text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
            <li className='text-xl text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
          </motion.ul>
          {/* Cart */}
          <div className='relative flex items-center justify-center'>
            <MdShoppingCart className='text-textColor text-2xl cursor-pointer' />
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-bold">
                2
              </p>
            </div>
          </div>
          <div className='relative'>
            {/* Profile Image */}
            <motion.img whileTap={{ scale: 0.6 }} src={user ? user.photoURL : Avatar} alt="profile logo" className='w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full' onClick={login} referrerPolicy="no-referrer" />
            {/* DropDown Menu */}
            {isMenu && (
              <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className='w-40 bg-gray-100 shadow-2xl rounded-xl flex flex-col absolute top-12 right-0'>
                {user && user.email === '19btcse07@suiit.ac.in' && (
                  <Link to={"/createItem"}>
                    <p onClick={() => setIsMenu(false)} className='px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-md font-bold rounded-t-xl'>New Item <MdAdd /></p>
                  </Link>
                )}
                <p onClick={logout} className='m-2 p-2 rounded-lg shadow-lg bg-gray-300 flex items-center justify-between cursor-pointer hover:bg-slate-400 transition-all duration-100 ease-in-out text-textColor text-md font-bold hover:text-white'>Logout <MdLogout /></p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className='flex items-center justify-between md:hidden w-full h-full'>
        {/* Brand Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="" className='object-cover w-10' />
          <p className='text-headingColor text-xl font-bold'>City</p>
        </Link>
        <div className='relative flex items-center gap-8'>
          {/* Cart */}
          <div className='relative flex items-center justify-center'>
            <MdShoppingCart className='text-textColor text-xl cursor-pointer' />
            <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-[10px] text-white font-medium">
                2
              </p>
            </div>
          </div>
          {/* Profile Image */}
          <motion.img whileTap={{ scale: 0.6 }} src={user ? user.photoURL : Avatar} alt="profile logo" className='w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full' onClick={login} referrerPolicy="no-referrer" />
          {/* DropDown Menu */}
          {isMenu && (
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className='w-40 bg-gray-100 shadow-2xl rounded-xl flex flex-col absolute top-12 right-0'>
              {user && user.email === '19btcse07@suiit.ac.in' && (
                <Link to={"/createItem"}>
                  <p onClick={() => setIsMenu(false)} className='px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-md rounded-t-xl'>New Item <MdAdd /></p>
                </Link>
              )}
              {/* NavBar Items */}
              <ul className='flex flex-col'>
                <li onClick={() => setIsMenu(false)} className='flex items-center justify-between px-4 py-2 text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200'>Home <MdHome /></li>
                <li onClick={() => setIsMenu(false)} className='flex items-center justify-between px-4 py-2 text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200'>Menu <MdOutlineRestaurantMenu /></li>
                <li onClick={() => setIsMenu(false)} className='flex items-center justify-between px-4 py-2 text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200'>About Us <HiUsers /></li>
                <li onClick={() => setIsMenu(false)} className='flex items-center justify-between px-4 py-2 text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200'>Service <MdRoomService /></li>
              </ul>
              <p onClick={logout} className='m-2 p-2 rounded-lg shadow-lg bg-gray-300 flex items-center justify-between cursor-pointer hover:bg-slate-400 transition-all duration-100 ease-in-out text-textColor text-md font-bold'>Logout <MdLogout /></p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header