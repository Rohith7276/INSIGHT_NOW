"use client"
import { FaRegUser } from "react-icons/fa";
import React, { useContext, useEffect, useRef } from 'react'
import icon from "../public/icons/2.svg"
import icon2 from "../public/icons/1.svg"
import { IoIosMenu } from "react-icons/io";
import Image from 'next/image'
import { useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
import ThemeBtn from './themeBtn'
import { FaSearch } from "react-icons/fa";
import { useTheme } from '@/app/contexts/themes';
import useSource from '@/app/contexts/sources';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
    const themeMode = useTheme()
    const search = useRef()
    const { data: session } = useSession();
    const profileDropdown = useRef()
    const profilebutton = useRef()
    const menuItems = useRef()
    const categories = useRef()
    const calender1 = useRef()
    const calender2 = useRef()
    const languages = useRef()
    const fromCalender = useRef()
    const toCalender = useRef()
    const dateDropdown = useRef()
    const sortDropdown = useRef()
    const countries = useRef()
    const { sources, setData } = useSource()
    const [data, setdata] = useState({ categories: "", country: "", language: "", search: "", sort: "relevance", from: "", to: "" })
    const [value, setValue] = useState(new Date());
    const thirtyDaysBefore = new Date()
    const currentDate = thirtyDaysBefore.getDate()
    thirtyDaysBefore.setDate(currentDate - 33)
    const twoDaysBefore = new Date();
    twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);

    const handleCalender1 = (e) => {
        let date = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
        setdata({ ...data, from: date })
        calender1.current.style.display = "none"
    }
    const handleCalender2 = (e) => {
        let date = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
        setdata({ ...data, to: date })
        calender2.current.style.display = "none"
    }



    useEffect(() => {
        setData(data)
    }, [data])



    const handleCategories = () => {
        if (categories.current.style.display === "flex") categories.current.style.display = "none"
        else {
            countries.current.style.display = "none"
            categories.current.style.display = "flex"
            languages.current.style.display = "none"
        }
    }
    const handleMenu = () => {
        if (menuItems.current.style.display === "flex") {
            menuItems.current.style.display = "none"
        }
        else {
            menuItems.current.style.display = "flex"
        }
    }
    const handleCountry = () => {
        if (countries.current.style.display === "flex") countries.current.style.display = "none"
        else {
            countries.current.style.display = "flex"
            categories.current.style.display = "none"
            languages.current.style.display = "none"
        }

    }
    const handleLanguage = () => {
        if (languages.current.style.display === "flex") languages.current.style.display = "none"
        else {
            countries.current.style.display = "none"
            categories.current.style.display = "none"
            languages.current.style.display = "flex"
        }
    }
    const handleScroll = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth' // Ensures the scrolling is smooth
        });
    }

    const handleSearch = () => {
        if ((search.current.value !== data.search) && search.current.value) {
            const obj = { ...data, search: search.current.value }
            setdata(obj)
        }
        search.current.value = ""
    }

    const categoriesData = (event, e) => {
        let x = document.querySelectorAll(".categoryBtn")
        x.forEach((button) => {
            button.style.border = "0px"
        });
        event.target.style.border = "1px solid red"
        countries.current.style.display = "none"
        categories.current.style.display = "none"
        languages.current.style.display = "none"
        const obj = { ...data, categories: `${e}` }
        setdata(obj)
    }

    const languagesData = (event, e) => {
        let x = document.querySelectorAll(".languageBtn")
        x.forEach((button) => {
            button.style.border = "0px"
        });
        event.target.style.border = "1px solid red"
        countries.current.style.display = "none"
        categories.current.style.display = "none"
        languages.current.style.display = "none"
        const obj = { ...data, language: e }
        if (data.language !== e)
            setdata(obj)
    }

    const handleSort = () => {
        sortDropdown.current.style.display = "flex"
    }

    const handleDate = () => {
        dateDropdown.current.style.display = "flex"
    }

    const handleFrom = () => {
        calender1.current.style.display = "block"
    }

    const handleTo = () => {
        calender2.current.style.display = "block"
    }

    const countryData = (event, e) => {
        let x = document.querySelectorAll(".countryBtn")
        x.forEach((button) => {
            button.style.border = "0px"
        });
        event.target.style.border = "1px solid red"
        countries.current.style.display = "none"
        categories.current.style.display = "none"
        languages.current.style.display = "none"
        const obj = { ...data, country: e }
        setdata(obj)
    }

    if (typeof document !== "undefined") {
        //handels hiding the dropdowns when clicked on window
        document.body.addEventListener("click", (event) => {
            if (countries.current) countries.current.style.display = "none";
            if (categories.current) categories.current.style.display = "none";
            if (dateDropdown.current) dateDropdown.current.style.display = "none"
            if (sortDropdown.current) sortDropdown.current.style.display = "none"
            if (calender1.current) calender1.current.style.display = "none"
            if (calender2.current) calender2.current.style.display = "none"
            if (profileDropdown.current) profileDropdown.current.style.display = "none"
            if (languages.current) languages.current.style.display = "none";
        })
        //handels bringing back the hidden menu from lg(1024)width
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                menuItems.current.style.display = 'flex';
            }
        });
    }
    return (<>
        <nav className='shadow-md dark:shadow-sm dark:shadow-gray-600 flex z-[100]  bg-white dark:bg-black justify-between w-full h-[4rem] items-center  sticky top-0'>
            <div onClick={() => setdata({ categories: "", country: "", language: "", search: "" })} className='flex items-center h-11 overflow-hidden px-4 cursor-pointer hover:drop-shadow-md dark:hover:drop-shadow-[0_0px_0.5px_white] '>
                {(themeMode === 'dark') ? <Image src={icon} width={150} alt="" /> : <Image src={icon2} width={150} alt="" />}
            </div>
            <button className="lg:hidden w-fit mx-9 h-full" onClick={handleMenu} >
                <IoIosMenu style={{ fontSize: '50px', height: '30px', width: '50px' }} className="dark:fill-white" />
            </button>
            <div ref={menuItems} className='flex-col dark:shadow-gray-600 dark:shadow-sm lg:dark:shadow-none absolute lg:relative lg:flex hidden  right-0 lg:flex-row items-center gap-3 px-5 text-black dark:text-white dark:bg-black bg-white lg:shadow-none lg:mt-0 mt-[19.4rem]  shadow-md py-4 lg:py-0 rounded-sm '  >
                <ThemeBtn />
                <button onClick={handleCategories} className='hover:text-black dark:hover:text-white flex items-center hover:underline cursor-pointer'>Categories</button>
                <button onClick={handleLanguage} className='hover:text-black dark:hover:text-white flex items-center hover:underline cursor-pointer'>Language</button>
                <button onClick={handleCountry} className='hover:text-black dark:hover:text-white flex items-center hover:underline cursor-pointer'>Country</button>

                <button onClick={handleScroll} className='hover:text-black dark:hover:text-white flex items-center hover:underline cursor-pointer'>Contact</button>
                {(session) ?
                    <button ref={profilebutton} onClick={() => {
                        if (profileDropdown.current.style.display === "flex") profileDropdown.current.style.display = "none";
                        else profileDropdown.current.style.display = "flex"
                    }} className='bg-[#af0000] text-white px-3 py-1 rounded-full  transition-all ease-linear duration-[10ms]'>
                        <>
                            <button className="hover:scale-105 flex py-2">
                                <FaRegUser /> <FaAngleDown />
                            </button>
                            <div className="fixed hidden z-[101] top-[19rem] lg:top-[4rem] shadow-md dark:shadow-sm dark:shadow-gray-600 p-[0.5rem_1.5rem_1rem_1.5rem] gap-2 cursor-default right-[0rem] flex-col rounded-b-lg min-w-[10rem] rounded-tl-lg lg:rounded-tl-none bg-white text-black dark:bg-black dark:text-white" ref={profileDropdown}>

                                {session.user.name}

                                <button onClick={signOut}>Log Out</button>


                            </div>
                        </>
                    </button>
                    :
                    <button onClick={signIn} className='bg-[#af0000] hover:scale-105 text-white px-3 py-1 rounded-full transition-all ease-linear duration-[10ms]'>Log in</button>}

            </div>
        </nav>
        <div className='flex w-full flex-col'>
            <div className='flex items-center justify-between p-5 flex-col gap-2 lg:flex-row'>
                <div className='flex w-fit px-3 py-2 gap-3 items-center bg-white  rounded-md'>
                    <input ref={search} className='rounded-sm sm:w-[25rem] max-w-[25rem] outline-none' type="text" placeholder='Search about news, articles, place, people..' />
                    <FaSearch onClick={handleSearch} className='cursor-pointer fill-[#c70f0f]' />
                </div>
                <div className=' gap-2 flex' >
                    <div>
                        <button onClick={handleDate} className='bg-white relative z-30 h-fit w-[11.1rem] px-4 py-1 rounded-md flex items-center gap-2'>Date published <FaAngleDown /></button>
                        <div className='bg-gray-100 rounded-b-md -mt-2  pt-3 w-[11.1rem] hidden absolute flex-col z-20 px-4' ref={dateDropdown}>
                            <button className=' flex justify-between pr-3' onClick={handleFrom} ref={fromCalender}><span>From:</span> {data.from === "" && <div className='text-center w-[5rem]'>-</div>}  {data.from}</button>
                            <button className=' flex justify-between pr-3' onClick={handleTo} ref={toCalender}><span>To:</span> {data.to === "" && <div className='text-center w-[5rem]'>-</div>} {data.to}</button>
                            <button className='text-center' onClick={() => { if (data.from || data.to) setdata({ ...data, from: "", to: "" }) }} ref={toCalender}>reset</button>

                        </div>
                        <div ref={calender1} className='hidden z-20 absolute -ml-[5rem]'>
                            <Calendar onChange={handleCalender1} value={value} maxDate={twoDaysBefore} minDate={thirtyDaysBefore} />
                        </div>
                        <div ref={calender2} className='hidden z-20 absolute -ml-[5rem]'>
                            <Calendar onChange={handleCalender2} value={value} maxDate={twoDaysBefore} minDate={thirtyDaysBefore} />
                        </div>
                    </div>
                    <div >
                        <button onClick={handleSort} className='bg-white h-fit w-[14rem] px-4 py-1 rounded-md flex items-center relative z-30 gap-2 justify-between'>Sort by: {sources.sort}<FaAngleDown /></button>
                        <div className='bg-gray-100 -mt-2 pt-2 w-[14rem] rounded-b-md hidden absolute flex-col z-20' ref={sortDropdown}>
                            <button onClick={() => { sortDropdown.current.style.display = "none"; setdata({ ...data, sort: "publishedAt" }) }} ref={toCalender}>publishedAt</button>
                            <button onClick={() => { sortDropdown.current.style.display = "none"; setdata({ ...data, sort: "relevancy" }) }} ref={toCalender}>relevancy</button>
                            <button onClick={() => { sortDropdown.current.style.display = "none"; setdata({ ...data, sort: "popularity" }) }} ref={toCalender}>popularity</button>
                        </div>
                    </div>
                </div>
            </div>
            {data.search && <div className='mx-10 flex flex-col gap-3'> <span className='dark:text-white'>Search results for &ldquo;{data.search}&ldquo;:</span><span className='cursor-pointer text-blue-700 underline' onClick={() => setdata({ ...data, search: "" })}>clear search</span> </div>}
        </div>
        <div className='fixed hidden z-[99] lg:z-[101] top-[6rem] lg:top-[4rem] shadow-md dark:shadow-sm dark:shadow-gray-600 p-[0.5rem_1.5rem_1rem_1.5rem] gap-12 right-[7rem] lg:right-[19rem] rounded-t-md lg:rounded-t-none rounded-b-lg w-fit bg-white text-black dark:bg-black dark:text-white' ref={categories}>
            <div className='flex flex-col'>
                <button onClick={(event) => categoriesData(event, "")} className='hover:text-red-600 categoryBtn  border border-red-500'>All Categories</button>
                <button onClick={(event) => categoriesData(event, `"business" OR "Company" OR "Firm" OR "Enterprise" OR "Corporation" OR "Organization" OR "Commerce" OR "Industry"`)} className='hover:text-red-600 categoryBtn'>Business</button>

                <button onClick={(event) => categoriesData(event, `"entertainment" OR "movie" OR "Film" OR "Movies" OR "TV show" OR "Anime" OR "actor"`)} className='hover:text-red-600 categoryBtn'>Entertainment</button>

                <button onClick={(event) => categoriesData(event, `"general" OR "News" OR "Current Affairs" OR "Updates"`)} className='hover:text-red-600 categoryBtn'>General</button>

                <button onClick={(event) => categoriesData(event, `"health" OR "Wellness" OR "Medicine" OR "Fitness" OR "Healthcare"`)} className='hover:text-red-600 categoryBtn'>Health</button>

                <button onClick={(event) => categoriesData(event, `"science" OR "Research" OR "Innovation" OR "Technology" OR "Discoveries"`)} className='hover:text-red-600 categoryBtn'>Science</button>

                <button onClick={(event) => categoriesData(event, `"sports" OR "Athletics" OR "Games" OR "Competitions" OR "Fitness"`)} className='hover:text-red-600 categoryBtn'>Sports</button>

                <button onClick={(event) => categoriesData(event, `"technology" OR "Tech" OR "Innovation" OR "Gadgets" OR "Software" OR "Hardware"`)} className='hover:text-red-600 categoryBtn'>Technology</button>
            </div>
        </div>
        <div className='fixed hidden z-[99] lg:z-[101] top-[4rem] shadow-md dark:shadow-sm dark:shadow-gray-600 flex-col p-[0.5rem_1.5rem_1rem_1.5rem] gap-12 right-[7.64rem] lg:right-[12.5rem] rounded-b-lg w-fit bg-white text-black dark:bg-black dark:text-white' ref={languages}>
            <div className='w-fit flex flex-col'>
                <button onClick={(event) => languagesData(event, "")} className='hover:text-red-600 languageBtn  border border-red-500'>All Languages</button>
                <button onClick={(event) => languagesData(event, "ar")} className='hover:text-red-600 languageBtn '>Arabic</button>
                <button onClick={(event) => languagesData(event, "zh")} className='hover:text-red-600 languageBtn '>Chinese</button>
                <button onClick={(event) => languagesData(event, "nl")} className='hover:text-red-600 languageBtn '>Dutch</button>
                <button onClick={(event) => languagesData(event, "en")} className='hover:text-red-600 languageBtn '>English</button>
                <button onClick={(event) => languagesData(event, "fr")} className='hover:text-red-600 languageBtn '>French</button>
                <button onClick={(event) => languagesData(event, "de")} className='hover:text-red-600 languageBtn '>German</button>
                <button onClick={(event) => languagesData(event, "he")} className='hover:text-red-600 languageBtn '>Hebrew</button>
                <button onClick={(event) => languagesData(event, "it")} className='hover:text-red-600 languageBtn '>Italian</button>
                <button onClick={(event) => languagesData(event, "no")} className='hover:text-red-600 languageBtn '>Norwegian</button>
                <button onClick={(event) => languagesData(event, "pt")} className='hover:text-red-600 languageBtn '>Portuguese</button>
                <button onClick={(event) => languagesData(event, "ru")} className='hover:text-red-600 languageBtn '>Russian</button>
                <button onClick={(event) => languagesData(event, "es")} className='hover:text-red-600 languageBtn '>Spanish</button>
                <button onClick={(event) => languagesData(event, "sv")} className='hover:text-red-600 languageBtn '>Swedish</button>
            </div>
        </div>
        <div className='fixed hidden z-[99] lg:z-[101] top-[4rem] right-[7.6rem] shadow-md dark:shadow-sm dark:shadow-gray-600 fl-col p-[0.5rem_2.5rem_1rem_2.5rem] gap-12 lg:right-[1vw] rounded-b-lg  w-fit bg-white text-black dark:bg-black dark:text-white ' ref={countries}>
            <div className='flex flex-col'>
                <button onClick={(event) => countryData(event, "")} className='hover:text-red-600 countryBtn  border border-red-500'>All Countries</button>
                <button onClick={(event) => countryData(event, "ar")} className='hover:text-red-600 countryBtn'>Argentina</button>
                <button onClick={(event) => countryData(event, "au")} className='hover:text-red-600 countryBtn'>Australia</button>
                <button onClick={(event) => countryData(event, "at")} className='hover:text-red-600 countryBtn'>Austria</button>
                <button onClick={(event) => countryData(event, "be")} className='hover:text-red-600 countryBtn'>Belgium</button>
                <button onClick={(event) => countryData(event, "br")} className='hover:text-red-600 countryBtn'>Brazil</button>
                <button onClick={(event) => countryData(event, "bg")} className='hover:text-red-600 countryBtn'>Bulgaria</button>
                <button onClick={(event) => countryData(event, "ca")} className='hover:text-red-600 countryBtn'>Canada</button>
                <button onClick={(event) => countryData(event, "cn")} className='hover:text-red-600 countryBtn'>China</button>
                <button onClick={(event) => countryData(event, "co")} className='hover:text-red-600 countryBtn'>Colombia</button>
                <button onClick={(event) => countryData(event, "cu")} className='hover:text-red-600 countryBtn'>Cuba</button>
                <button onClick={(event) => countryData(event, "cz")} className='hover:text-red-600 countryBtn'>Czech Republic</button>
                <button onClick={(event) => countryData(event, "eg")} className='hover:text-red-600 countryBtn'>Egypt</button>
                <button onClick={(event) => countryData(event, "fr")} className='hover:text-red-600 countryBtn'>France</button>
                <button onClick={(event) => countryData(event, "de")} className='hover:text-red-600 countryBtn'>Germany</button>
            </div>
            <div className='flex flex-col'>
                <button onClick={(event) => countryData(event, "Greece")} className='hover:text-red-600 countryBtn'>Greece</button>
                <button onClick={(event) => countryData(event, "Hong Kong")} className='hover:text-red-600 countryBtn'>Hong Kong</button>
                <button onClick={(event) => countryData(event, "Hungary")} className='hover:text-red-600 countryBtn'>Hungary</button>
                <button onClick={(event) => countryData(event, "Indonesia")} className='hover:text-red-600 countryBtn'>Indonesia</button>
                <button onClick={(event) => countryData(event, "Israel")} className='hover:text-red-600 countryBtn'>Israel</button>
                <button onClick={(event) => countryData(event, "Italy")} className='hover:text-red-600 countryBtn'>Italy</button>
                <button onClick={(event) => countryData(event, "Japan")} className='hover:text-red-600 countryBtn'>Japan</button>
                <button onClick={(event) => countryData(event, "Lithuania")} className='hover:text-red-600 countryBtn'>Lithuania</button>
                <button onClick={(event) => countryData(event, "Latvia")} className='hover:text-red-600 countryBtn'>Latvia</button>
                <button onClick={(event) => countryData(event, "Mexico")} className='hover:text-red-600 countryBtn'>Mexico</button>
                <button onClick={(event) => countryData(event, "Malaysia")} className='hover:text-red-600 countryBtn'>Malaysia</button>
                <button onClick={(event) => countryData(event, "Netherlands")} className='hover:text-red-600 countryBtn'>Netherlands</button>
                <button onClick={(event) => countryData(event, "New Zealand")} className='hover:text-red-600 countryBtn'>New Zealand</button>
                <button onClick={(event) => countryData(event, "Nigeria")} className='hover:text-red-600 countryBtn'>Nigeria</button>
                <button onClick={(event) => countryData(event, "Norway")} className='hover:text-red-600 countryBtn'>Norway</button>
            </div>
            <div className='flex flex-col'>
                <button onClick={(event) => countryData(event, "Philippines")} className='hover:text-red-600 countryBtn '>Philippines</button>
                <button onClick={(event) => countryData(event, "Poland")} className='hover:text-red-600 countryBtn '>Poland</button>
                <button onClick={(event) => countryData(event, "Portugal")} className='hover:text-red-600 countryBtn '>Portugal</button>
                <button onClick={(event) => countryData(event, "Russia")} className='hover:text-red-600 countryBtn '>Russia</button>
                <button onClick={(event) => countryData(event, "Sweden")} className='hover:text-red-600 countryBtn '>Sweden</button>
                <button onClick={(event) => countryData(event, "Singapore")} className='hover:text-red-600 countryBtn '>Singapore</button>
                <button onClick={(event) => countryData(event, "Thailand")} className='hover:text-red-600 countryBtn '>Thailand</button>
                <button onClick={(event) => countryData(event, "Turkey")} className='hover:text-red-600 countryBtn '>Turkey</button>
                <button onClick={(event) => countryData(event, "Taiwan")} className='hover:text-red-600 countryBtn '>Taiwan</button>
                <button onClick={(event) => countryData(event, "Ukraine")} className='hover:text-red-600 countryBtn '>Ukraine</button>
                <button onClick={(event) => countryData(event, "United Arab Emarites")} className='hover:text-red-600 countryBtn '>United Arab Emirates</button>
                <button onClick={(event) => countryData(event, "United Kingdom")} className='hover:text-red-600 countryBtn '>United Kingdom</button>
                <button onClick={(event) => countryData(event, "United States")} className='hover:text-red-600 countryBtn '>United States</button>
                <button onClick={(event) => countryData(event, "Vietnam")} className='hover:text-red-600 countryBtn '>Vietnam</button>
                <button onClick={(event) => countryData(event, "South Africa")} className='hover:text-red-600 countryBtn '>South Africa</button>

            </div>
        </div>
    </>
    )
}

export default Navbar
