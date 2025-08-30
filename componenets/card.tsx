"use client"

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaChevronRight, FaUser } from 'react-icons/fa6';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Card({props}: any){
  const [page,setPage]= useState(2);
  const [more, setMore] = useState(true)
  const [loader, setLoader] = useState("Loading ...")
  const [newsText, setNewsText] = useState([]);

  useEffect(() => {
    fetchMoreData()
  },[])


  const fetchMoreData = async () => {

    setPage(page+1);
    axios({
      method:"GET",
      url:`${process.env.URL}api/allrecpies?size=${10}&page=${page}`,
    })
    .then( function (res){
      console.log(res.data)
      if (res.status === 200) {
        // end of the data
        /*
        if(res.data[0] == undefined){
          setMore(false)
        }*/
        if(res.data){
          setNewsText(newsText.concat(res.data))
        }
      }
    })
    
    .catch( function (err){
      console.log(err)
      setLoader("bad network !")
    })
    
  }




    return(
        <div>

          {/*<InfiniteScroll
          dataLength={10}
          next={fetchMoreData}
          //hasMore={newsText.length}
          hasMore={more}
          //you can create a spinner component which will be
          //displayed when the Items are being loaded
          //loader={newsText.length? <>loader</>: <p>Loading ...</p>}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }

          // below props only if you need pull down functionality
          refreshFunction={fetchMoreData}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
        >

        <div className="flex flex-wrap gap-6 justify-center mt-12">
          {newsText && newsText.map((i : any, index: any) => 
            <div key={index} className="w-96 p-5 flex flex-col border-gray-100 shadow-2xl border-2 rounded-md">
              <b className='text-xl'>{i.name}</b>
              <div className='flex mt-6 items-center gap-2'>
                <FaUser className='text-[1.2rem] text-gray-800'/>
                <p className='text-gray-800'>{i.author}</p>
              </div>
              <p className='mt-4 text-tiny'>{i.description?.substring(0, 160)} ...</p>
              <div className='flex items-center gap-2 pt-4 text-primery font-extrabold'>
                <FaChevronRight />
                <Link href={`/index/${i._id}`} target='_blank'> Read More </Link>
              </div>
            </div>
            )}
        </div>

        </InfiniteScroll>*/}
        <div className="flex flex-wrap gap-6 justify-center mt-12">
          {newsText && newsText.map((i : any, index: any) => 
            <div key={index} className="w-96 p-5 flex flex-col border-gray-100 shadow-2xl border-2 rounded-md">
              <b className='text-xl'>{i.name}</b>
              <div className='flex mt-6 items-center gap-2'>
                <FaUser className='text-[1.2rem] text-gray-800'/>
                <p className='text-gray-800'>{i.author}</p>
              </div>
              <p className='mt-4 text-tiny'>{i.description?.substring(0, 160)} ...</p>
              <div className='flex items-center gap-2 pt-4 text-primery font-extrabold'>
                <FaChevronRight />
                <Link href={`/index/${i._id}`} target='_blank'> Read More </Link>
              </div>
            </div>
            )}
        </div>
        <center>
          <button className='py-3 px-16 rounded-xl my-8 bg-primery text-white cursor-pointer' onClick={fetchMoreData}>Load More ...</button>
        </center>
        </div>
    )
}