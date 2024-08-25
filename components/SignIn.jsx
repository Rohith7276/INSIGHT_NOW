import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'; 
import useSource from '@/app/contexts/sources';

const form = () => {

    const [userNotFound, setUserNotFound] = useState(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getData = async (username, password) => {
        let req = await fetch(`http://localhost:3001/${username}/${password}`)
        let passwords = await req.json()
        return new Promise((resolve, reject) => {
            if (passwords === null) reject("user is not found")
            else resolve("user found");
        })
    }

    const onSubmit = async (data) => {
        setUserNotFound(false)
        try {
            await getData(data.username, data.password)
            router.push('/loggedIn')
        }
        catch {
            setUserNotFound(true)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col my-14 items-center gap-9'>
                < input type="text" placeholder='Username' className='border outline-red-400 border-red-400 py-2 px-3 w-[80%] rounded-sm' {...register("username")} />
                <input type="password" placeholder='Password' className='border outline-red-400 border-red-400 py-2 px-3 w-[80%] rounded-sm' {...register("password")} />
                {userNotFound && <div className=' text-white'>Username or password is incorrect</div>}
                <button className='bg-white px-3 py-2 my-1 rounded-md hover:outline text-xl hover:text-red-500' type='submit'>Sign In</button>
            </div >
        </form >
    )
}

export default form
