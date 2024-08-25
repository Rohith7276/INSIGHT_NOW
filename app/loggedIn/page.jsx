import React from 'react'
import icon from "../../public/icons/1.svg"
import Image from 'next/image'
const signedIn = () => {
    return (
        <div>
            <>
                <div className='flex left-0 top-0 absolute bgrd justify-center items-center  bg-[#fdd3d3] h-screen w-full overflow-hidden'>
                    <div className='z-10 text-black h-[90vh] w-[80vw]  flex rounded-lg shadow-md shadow-black bg-white overflow-hidden '>
                        <div className='w-full flex items-center justify-center flex-col'>
                            <div className='h-[20rem] flex items-center justify-center overflow-hidden'>

                                <Image src={icon} width={350} className='m-auto' alt="" />
                            </div>
                            <h1 className='text-2xl px-5 mx-7'>Thank You for joining us, dive into the latest news now!</h1>
                            <a href="\" className='w-fit m-auto '>
                                <button><img src="https://static.vecteezy.com/system/resources/previews/000/568/450/original/home-icon-vector.jpg" width={"50px"} alt="" /></button>
                            </a>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default signedIn
