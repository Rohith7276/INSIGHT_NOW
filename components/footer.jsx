import React from 'react'
import Image from 'next/image'
import Icon from '../app/icon.ico'

const footer = () => {
  return (
    <footer className='min-h-[20rem]  bg-[#ff6060] dark:bg-[#130202] dark:shadow-[0px_0_17px_-3px_#ff0000] flex-col lg:flex-row text-black p-5 flex items-center'>
      <div className="left flex flex-col items-center py-9 max-w-[21rem] px-5 gap-3 bg-black rounded-md mx-7  ">
        <Image src={Icon} width={150}></Image>
        <span className='text-white text-center'>Thank you for visiting INSIGHT NOW!</span>
      </div>
      <div className=' w-full justify-around items-start hidden lg:flex'>
        <div>
          <h2 className='cursor-default text-xl text-white -m-3 mb-2'>About Us</h2>
          <ul>
            <li className='cursor-pointer hover:underline dark:text-gray-500'>Our Story</li>
            <li className='cursor-pointer hover:underline dark:text-gray-500'>Team</li>
            <li className='cursor-pointer hover:underline dark:text-gray-500'>Careers</li>
            <li className='cursor-pointer hover:underline dark:text-gray-500'>Press</li>
          </ul>
        </div>
        <div>
          <h2 className='cursor-default text-xl text-white -m-3 mb-2'>Follow Us</h2>
          <ul>
            <li className='cursor-pointer hover:underline dark:text-gray-500'>Facebook</li>
            <li className='cursor-pointer hover:underline dark:text-gray-500'>Twitter</li>
            <li className='cursor-pointer hover:underline dark:text-gray-500'>Instagram</li>
            <li className='cursor-pointer hover:underline dark:text-gray-500'>LinkedIn</li>
          </ul>
        </div>
        <div>
          <h2 className='cursor-default text-xl text-white -m-3 mb-2'>Contact Us</h2>
          <ul>
            <li className='cursor-pointer hover:underline dark:text-gray-500'>Email: contact@insightnow.com</li>
            <li className='cursor-pointer hover:underline dark:text-gray-500'>Phone: (123) 456-7890</li>
            <li className='cursor-pointer hover:underline dark:text-gray-500'>Address: 123 News St, bangalore, India</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default footer
