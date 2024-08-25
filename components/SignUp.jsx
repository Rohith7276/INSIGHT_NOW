import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import SignedIn from './signedIn';
import { useRouter } from 'next/navigation';
import signedIn from './signedIn';
import useSource from '@/app/contexts/sources';

const form = () => {
    const [UserExist, setUserExist] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [pass, setpass] = useState()
    const router = useRouter()

    const { sources, setData } = useSource()


    const getData = async (username, password) => {
        let req = await fetch(`http://localhost:3001/${username}`)
        let data = await req.json()
        return new Promise((resolve, reject) => {
            if (data) resolve("user found")
            else reject("user not found");
        })
    }
    const postData = async (username, password) => {

        await fetch("http://localhost:3001/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user: username, password: password })
        }).then(() => { console.log('username', username); localStorage.setItem("username", username) })
    }
    const onSubmit = async (data) => {
        setUserExist(false)
        try {
            await getData(data.Username)
            setUserExist(true)
        }
        catch {
            if (data.Password != data.temp) {
                console.log('error')
                setpass(true)
            }
            else {
                try {
                    await postData(data.Username, data.Password)
                    router.push('/loggedIn')
                }
                catch { alert("could not post the data") }
            }
        }

    }
    const handlePass = () => {

    }
    const handleChange = () => {

    }
    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col  h-fit lg:gap-2 gap-1 my-10 items-center justify-between'>
                <input type="text" {...register('Username', { required: true })} placeholder='Username' className='my-2 border outline-red-400 border-red-400 py-2 px-3 w-[80%] rounded-sm' />
                {errors.Username && <span className=' text-white  '>Username is required</span>}
                {UserExist && <div className='text-white'>Username already exists</div>}

                <input type="password" {...register('Password', { required: true, minLength: { value: 8, message: "Minimum 8 characters" } })} placeholder='Password' className='my-2 border outline-red-400 border-red-400 py-2 px-3 w-[80%] rounded-sm' />
                {errors.Password && <span className=' text-white'>{errors.Password.message}</span>}

                <input type="password" {...register('temp', { required: true })} placeholder='Re-enter password' className='my-2 border outline-red-400 border-red-400 py-2 px-3 w-[80%] rounded-sm' onChange={handlePass} />
                {pass && <span className=' text-white'>Password did not match try again</span>}
                <button type='submit' className='bg-white px-3 py-2 my-3  rounded-md hover:outline text-xl hover:text-red-500'>Sign Up</button>
            </div>
        </form ></>
    )
}

export default form
