"use client"
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Typed from 'typed.js';
import SignIn from './SignIn';
import SignedIn from './signedIn';
import SignUp from './SignUp';
import { IoHome } from "react-icons/io5";
import { useSession, signIn, signOut } from "next-auth/react"
import icon from "../public/icons/1.svg"

const LoginTemplate = () => {
  const { data: session } = useSession();
  const typedElement = useRef(null);
  const [signUp, setsignUp] = useState(false)

  const handleSignUp = () => {
    setsignUp(e => !e)
  }

  //typing aninmation
  useEffect(() => {
    const options = {
      strings: [
        'Your gateway to news.',
        'Explore today\'s stories.',
        'Stay informed with the latest news and in-depth analysis from around the world with INSIGHT NOW!'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: false,
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (<>
    {session ?
      <SignedIn />

      : <>

        <div className='flex bgrd justify-center items-center  bg-[#fdd3d3] min-h-screen py-5 w-full  lg:overflow-hidden'>
          <div className='z-10 text-black max-h-[90vh] w-[80vw] flex rounded-lg shadow-md shadow-black overflow-hidden'>
            <div className='w-2/5 bg-white hidden lg:flex  flex-col justify-around h-auto p-9 '>
              <div className='flex h-[7rem] items-center justify-center text-center overflow-hidden '>
                <div ><Image src={icon} width={350} className='m-auto' alt="" />
                </div>
              </div>
              <div className='h-[30%] mt-14'>
                <span className='text-black inline text-center' ref={typedElement} ></span>
              </div>
              <a href="\" className='w-fit m-auto'><button><Image src="https://static.vecteezy.com/system/resources/previews/000/568/450/original/home-icon-vector.jpg" width={50} height={100} alt="" /></button></a>
              {signUp ? <div className='m-auto'><h3 className='inline text-center'>Don&apos;t have an account? </h3>
                <a onClick={handleSignUp} className='text-red-700 hover:underline cursor-pointer'>Sign up</a>
              </div> :
                <div className='m-auto'><h3 className='inline text-center'>Already have an account? </h3>
                  <a onClick={handleSignUp} className='text-red-700 hover:underline cursor-pointer'>Sign in</a>
                </div>
              }
            </div>
            {signUp ?
              <div className='w-full flex justify-between lg:gap-0  gap-5 flex-col lg:w-3/5 bg-red-600 h-fit p-4 '>
                <h1 className='text-center block m-auto my-6 gap-5 w-fit text-white  rounded-full px-4 py-2 text-3xl'>Sign In</h1>
                <div className='flex gap-5 w-full my-4 justify-center '>
                  <button className='px-4 py-3 rounded-sm bg-white flex items-center  font-serif gap-3' onClick={() => signIn("github")}><Image src="https://th.bing.com/th/id/OIP.NGIDdVP6vw9ue_D-mrEVFQHaHa?rs=1&pid=ImageDetMain" width={50} height={100} alt="" />GitHub</button>
                </div>
                <SignIn />
                <a href="\" className='w-fit lg:hidden m-auto'><button ><IoHome className='fill-white w-6 h-6' /></button></a>

                <div className='m-auto lg:hidden'><h3 className='inline text-center text-white'>Don&apos;t have an account? </h3>
                  <a onClick={handleSignUp} className='text-white underline cursor-pointer'>Sign up</a>
                </div>
              </div> :
              <div className='w-full flex justify-between lg:gap-1 gap-0  flex-col lg:w-3/5 bg-red-600 h-full p-4 '>
                <h1 className='text-center block m-auto my-5 gap-5 w-fit text-white  rounded-full px-4 py-2 text-3xl'>Sign Up</h1>
                <div className='flex gap-5 w-full my-3 justify-center '>
                  <button className='px-4 py-3 rounded-sm bg-white flex items-center  font-serif gap-3' onClick={() => signIn("github")}><Image src="https://th.bing.com/th/id/OIP.NGIDdVP6vw9ue_D-mrEVFQHaHa?rs=1&pid=ImageDetMain" width={50} height={100} alt="" />GitHub</button>
                </div>
                <SignUp />
                <div className='m-auto lg:hidden items-center flex justify-center flex-col'>
                  <a href="\" className='w-fit lg:hidden m-auto'><button ><IoHome className='fill-white w-6 h-6' /></button></a>
                  <br />
                  <h3 className='inline text-white text-center'>Already have an account? </h3>
                  <a onClick={handleSignUp} className='underline text-white cursor-pointer'>Sign in</a>
                </div>
              </div>}
          </div>
        </div></>
    }
  </>
  )
}

export default LoginTemplate
