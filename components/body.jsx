import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Image from 'next/image'
import Ball1 from "../public/icons/ball1.svg"
import Ball2 from "../public/icons/ball2.svg"

const body = (article) => {
  let x = article.article

  //allows only viewable images
  const imgCheck = (e) => {
    if (typeof (e) === "string") {
      let x = e.includes("https://media.npr.org/include/images/facebook-default-wide-s1400-c100.jpg")
      if (x) {
        return false
      }
    }
    return true
  }

  var count = 0;

  //allows complete image view for the news article based on conditions
  function small() {
    if (count==10) { count = 0; return true; }
    count++;
    return false;
  }
  return (
    <div className='flex flex-wrap items-stretch  m-2' >
      {x?.map(item => {
          return (<>
            {item.title != "[Removed]" &&
              <>
                {((small() == true) && imgCheck(item.urlToImage) && item.urlToImage && item.urlToImage !== "") ?
                  <a target="_blank" href={item.url} className='self-center flex flex-col postcard rounded-md overflow-hidden w-fit h-fit m-1'>
                    <div className='bg-black w-fit h-[30rem]'>
                      <div className=' w-[45rem] overflow-hidden h-full'>
                        <img className='w-full imaage h-full' src={item.urlToImage} alt="" />
                        <div className='h-44 max-w-[100vw] box-border -mt-[24%] relative p-12 px-8 text-white bg-gradient-to-b from-black/0 via-black/75 to-black flex items-end z-[1] text-sm lg:text-2xl '>{item.title}</div>
                      </div>
                    </div>
                  </a>
                  :
                  <div key={item.title} className={' w-[22rem] mb-9 min-h-[30rem] max-w-[40rem] grow'}>
                    <div className='m-2 postcard h-full cursor-default  ease duration-100 bg-white dark:bg-[#3a0000] items-center p-4 rounded-[1rem] flex justify-between flex-col'>
                      <div className=''>
                        <div className="  w-fit overflow-hidden  rounded-t-md">
                          <div className='imaage'>
                            {(imgCheck(item.urlToImage) && item.urlToImage && item.urlToImage !== "") &&
                              <LazyLoadImage
                                effect="blur"
                                wrapperProps={{
                                  style: { transitionDelay: "1s" },
                                }}
                                src={item.urlToImage} />}
                          </div>
                        </div>
                      </div>
                      <div className="bt items-center w-full flex gap-10 mt-2 justify-center">
                        <div className=' hidden dark:flex w-fit'>
                          <Image src={Ball2} width={30} alt="" />
                          <Image src={Ball2} width={30} alt="" />
                          <Image src={Ball2} width={30} alt="" />
                        </div>
                        <div className='flex dark:hidden w-fit '>
                          <Image src={Ball1} width={30} alt="" />
                          <Image src={Ball1} width={30} alt="" />
                          <Image src={Ball1} width={30} alt="" />
                        </div>

                        <div className='border-b-2 dark:border-white border-black w-full'>

                        </div>
                      </div>
                      <div className='flex overflow-hidden text-sm lg:text-xl flex-col justify-center dark:text-white w-full h-full  text-black pb-3 font-bold text-center mb-2.5 dark:border-white border-black border-b-2  items-center'>
                        {item.title}
                        <br />
                        <p className='dark:text-gray-400 text-sm lg:text-lg w-full text-justify py-3'>
                          {(item.description && ((!imgCheck(item.urlToImage)) || !item.urlToImage)) && item.description}
                        </p>
                      </div>
                      <a target="_blank" href={item.url}><button className='hover:scale-105 transition-all ease-in-out bg-yellow-300 dark:bg-[#aa4f07b3] dark:text-white text-black font-bold  px-4 w-fit pt-1 pb-1 mb-[-2rem] rounded-full'>READ MORE</button>
                      </a>
                    </div>
                  </div>
                }
              </>
            }
          </>)
        })
      }

    </div>
  )
}

export default body
