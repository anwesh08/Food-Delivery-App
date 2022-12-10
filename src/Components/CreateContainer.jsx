import React, { useState } from 'react'
import Loader from './Loader'

import { motion } from 'framer-motion';

import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md';

import { categories } from '../Utils/data';

import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { saveItem } from '../Utils/firebaseFunctions';

const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (e) => {
    setIsLoading(true)
    const imageFile = e.target.files[0]
    // console.log(imageFile)
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }, (error) => {
      console.log(error)
      setFields(true)
      setMsg(`Error while uploading : Try Again 🙇`)
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageAsset(downloadURL)
        setIsLoading(false)
        setFields(true)
        setMsg(`Image uploaded succesfully 😊`)
        setAlertStatus('success')
        setTimeout(() => {
          setFields(false)
        }, 4000)
      })
    })
  }

  const deleteImage = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset)
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg(`Image deleted successfully 😊`)
      setAlertStatus('success')
      setTimeout(() => {
        setFields(false)
      }, 4000)
    })
  }

  const saveDetails = () => {
    setIsLoading(true)
    try {
      if (!title || !category || !imageAsset || !calories || !price) {
        setFields(true)
        setMsg(`Required field can't be empty.`)
        setAlertStatus('danger')
        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 4000)
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          qty: 1,
          calories: calories,
          price: price,
        }
        saveItem(data)
        setIsLoading(false)
        setFields(true)
        setMsg(`Data Uploaded successfully 😊`)
        setAlertStatus('success')
        setTimeout(() => {
          setFields(false)
        }, 4000)
        clearData()
      }
    } catch (error) {
      console.log(error)
      setFields(true)
      setMsg(`Error while uploading : Try Again 🙇`)
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }
  }

  function clearData() {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("");
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[70%] lg:w-[60%] border border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center gap-6'>
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-lg text-center font-semibold ${alertStatus === "danger" ? 'bg-red-400 text-red-700' : 'bg-emerald-400 text-emerald-700'}`}
          >
            {msg}
          </motion.p>
        )}
        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <MdFastfood className='text-2xl text-gray-700' />
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            required
            value={title}
            placeholder='Give me a title...'
            className='w-full h-full text-lg bg-transparent font-semibold px-4 py-2 outline-none border-none placeholder:text-gray-400 text-textColor'
          />
        </div>
        <div className="w-full">
          <select className='outline-none w-full border-b-2 border-gray-200 p-2 rounded-md cursor-pointer' onChange={(e) => setCategory(e.target.value)}>
            <option value="other" className='bg-white'>Select Category</option>
            {categories && categories.map(item => (
              <option
                key={item.id}
                className='text-base border-0 outline-none capitalize text-headingColor'
                value={item.urlParamName}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-md">
          {/* loader */}
          {isLoading ? (<Loader />) : (<>
            {!imageAsset ? (<>
              <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                  <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
                  <p className="text-gray-500 hover:text-gray-700">
                    Click here to upload
                  </p>
                </div>
                <input
                  type="file"
                  name="uploadingImage"
                  accept='image/*'
                  onChange={uploadImage}
                  className='w-0 h-0'
                />
              </label>
            </>) : (<>
              <div className='h-full relative'>
                <img
                  src={imageAsset}
                  alt="uploadImage"
                  className='w-full h-full object-cover'
                />
                <button
                  onClick={deleteImage}
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'>
                  <MdDelete className='text-white' />
                </button>
              </div>
            </>)}
          </>)}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className='text-gray-700 text-2xl' />
            <input
              onChange={(e) => setCalories(e.target.value)}
              type="text"
              value={calories}
              required
              placeholder='Calories'
              className='w-full h-full px-4 py-2 text-lg bg-transparent outline-none border-none font-semibold text-textColor'
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className='text-gray-700 text-2xl' />
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              value={price}
              required
              placeholder='Price'
              className='w-full h-full px-4 py-2 text-lg bg-transparent outline-none border-none font-semibold text-textColor'
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            onClick={saveDetails}
            type='button'
            className='ml-0 md:ml-auto w-full md:w-auto border-none text-white bg-emerald-500 px-12 py-2 rounded-full text-lg outline-none font-semibold'>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer