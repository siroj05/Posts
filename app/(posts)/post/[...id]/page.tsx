'use client'

import { getAllCommentsApi, getDetailApi } from "@/api/api";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function DetailPost({ params }: { params: { id: string } }) {

  const [isLoading, setLoading] = useState<boolean>(false)
  const [post, setPost] = useState<DetailResponse>()
  const [commentLoading, setCommentLoading] = useState(true);
  const [comments, setComments] = useState<any>()
  const [limit, setLimit] = useState(10)
  const commentsContainerRef = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    setLimit(limit + 10)
  }
  const id = params.id[0];
  useEffect(() => {
    async function getSinglePost() {
      setLoading(true);
      try {
        const data = await getDetailApi(id);
        setPost(data);
      } catch {
        console.log('404')
      } finally {
        setLoading(false);
      }
    }
    
    getSinglePost();
  }, []);

  useEffect(() => {
    async function getComments() {
      setCommentLoading(true);
      try {
        const data = await getAllCommentsApi(limit);
        setComments(data.comments);
      } catch {
        console.log('404')
      } finally {
        setCommentLoading(false)
        if (commentsContainerRef.current) {
          commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
      }
    }
    getComments()
  },[limit])

  return (
    <>
      {
        isLoading ?
          <div className="w-full flex justify-center">
            <div className="xl:p-10 xl:w-7/12 md:w-full flex  h-60 ">
              <div className="w-full bg-gray-100 p-4 rounded my-2 animate-pulse">
                {/* skeleton */}
              </div>
            </div> 
          </div>:
          <div className="w-full flex justify-center">
            <div className="xl:p-10 xl:w-7/12 md:w-full flex">
              <div className="w-full bg-gray-100 p-4 rounded my-2">
                <div className="xl:text-4xl text-xl font-semibold my-4">
                  {post?.title}
                </div>
                <div className=" text-gray-600 xl:text-xl text-sm my-4">{post?.body}</div>
                <div className="my-2 gap-2 flex">
                  <div className="flex">
                    <Image
                      className="my-auto"
                      src="/like.svg"
                      alt="like Logo"
                      width={16}
                      height={16}
                    />
                    {post?.reactions.likes}
                  </div>
                  <div className="flex">
                    <Image
                      className="my-auto"
                      src="/views.svg"
                      alt="views Logo"
                      width={16}
                      height={16}
                    />
                    {post?.views}
                  </div>
                </div>
                <div className="font-semibold">
                  Comments
                </div>
                {commentLoading ?
                    <div className="h-72  my-2 overflow-auto border-y">
                      {comments?.map((e:any, i:any) =>(
                          <div key={i} className="h-20 bg-gray-200 my-1 ">

                          </div>
                      ))}
                    </div>
                  :
                  comments.length > 0 ? 
                  <div className="h-72 border-y overflow-auto">
                    {
                      comments?.map((d: any, i: any) => {
                        return (
                          <>
                            <div key={i} className="bg-white my-1 rounded p-1">
                              <div className="font-semibold">
                                {d?.user?.username ?? ''}
                              </div>
                              <div className="text-sm">
                                {d?.body ?? ''}
                              </div>
                              <span className="text-sm my-2">
                                <div className="flex">
                                  <Image
                                    className="my-auto mx-1"
                                    src="/like.svg"
                                    alt="like Logo"
                                    width={12}
                                    height={12}
                                  />
                                  {d?.likes ?? ''}
                                </div>
                              </span>
                            </div>
                          </>
                        )
                      })
                    }
                    {
                      limit !== comments.total && 
                        <div className="flex justify-center">
                          <button className="font-thin border bg-white p-2 w-36 rounded-3xl my-2" onClick={handleClick}>
                            Load more
                          </button>
                        </div>
                    }
                  </div>
                  : <>
                    <div className="text-center text-gray-400 h-72 border-y">
                      <div className="mt-3">
                        No comments yet
                      </div>
                    </div>
                  </>
                }
                
              </div>
            </div>
          </div>
      }
    </>
  )
}