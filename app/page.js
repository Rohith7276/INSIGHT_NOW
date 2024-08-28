"use client"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaAnglesDown } from "react-icons/fa6";
import Body from "@/components/body";
import { ThemeProvider } from "@/app/contexts/themes";
import { SourceProvider } from "./contexts/sources";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import erroSvg from "../public/icons/error.svg"

export default function Home() {
  const [loginName, setLoginName] = useState("")
  const setName = (e)=>{
    setLoginName(e)
  }


  const body = useRef()
  const [ShowMore, setShowMore] = useState(false)
  const [sources, setsources] = useState({})
  const [article, setarticle] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, seterror] = useState(false)
  const setData = (e) => {
    setsources(e)
  }
  const fetchNews = async (page) => {
    setIsLoading(true);
    var url = `https://newsapi.org/v2/everything?apiKey=${process.env.NEWS_API_KEY}&q="a"`

    if (sources.search) {
      sources.country = ""
      sources.categories = ""
      url += `,${sources.search}`
    }
    if (sources.categories) {
      sources.country = ""
      url += `,${sources.categories}`
    }
    if (sources.country) {
      url += `,${sources.country}`
    }
    if (sources.language) {
      url += `&language=${sources.language}`;
    }
    if (sources.from) {
      url += `&from=${sources.from}`
    }
    if (sources.to) {
      url += `&to=${sources.to}`
    }
    if (sources.sort) {
      url += `&sortBy=${sources.sort}`
    }
    url += `&page=${page}`
    try {
      const response = await fetch(url);
      const data = await response.json();

      setIsLoading(false);
      return data;
    } catch (error) {
      seterror(true)
      setIsLoading(false);
      return "none";
    }
  }
  const page = useRef(1)

  // useEffect(() => {
  //   console.log("dfs",article);
  //   console.log("ddsfs",data.articles);
  //   console.log(sources);

  // }, [])
  

  useEffect(() => {
    const getData = async () => {
      const data = await fetchNews(1);
      page.current = 2;
      console.log(data);
      setarticle(data.articles || []);
      if (data) setShowMore(true);
    };
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    getData();
  }, [sources, fetchNews]);
  

  const handleAppendArticles = async (e) => {
    const data = await fetchNews(page.current)
    // console.log(data.articles);
    if (data.articles) {
      setShowMore(true)
      setarticle((prev) => [...prev, ...data.articles])
      page.current = page.current + 1
    }
    else {
      setShowMore(false)
    }
  }

  return (<div ref={body} className="">
    <ThemeProvider>
      <SourceProvider value={{ sources, setData, article, loginName, setName }}>
          {error? <div className="overflow-hidden w-full h-[100vh] bg-white"> <Image className=' m-auto' src={erroSvg} width={700} alt="error"></Image> <div className="text-center text-3xl mt-[-9rem] w-full">We will be back soon</div> </div> :
            <>
              <Navbar />
              <div className="min-h-[37vh]">

                {article && <Body article={article} />}
                {isLoading ? <div className='w-full h-[100vh] dark:text-white flex justify-center items-start'><div className="spinner-box">
                  <div className="three-quarter-spinner"></div>
                </div></div> : <>
                  {ShowMore ? <div className="flex w-full shwmr  justify-center items-center">
                    <button onClick={(e) => handleAppendArticles(e)} className="flex mb-4 outline-none hover:scale-105 ease duration-100 justify-center items-center flex-col text-[red] "><FaAnglesDown />Show more</button>
                  </div> : <div className="dark:text-[red] m-auto w-fit mb-4">You&apos;ve reached the end of the page.</div>}</>
                }
              </div>
              <Footer />
            </>
          }
      </SourceProvider>
    </ThemeProvider>
  </div>);
}
