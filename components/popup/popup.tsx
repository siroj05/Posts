import { getCommentsApi, getDetailApi } from "@/api/api";
import { useEffect, useState } from "react";
import Image from "next/image";
interface Props {
  setOpen: (value: boolean) => void
  detail: string | undefined
}

export default function Popup(
  {
    setOpen,
    detail
  }: Props
) {
  const [comments, setComments] = useState<any>()
  const [details, setDetails] = useState<DetailResponse | undefined>()
  const [commentLoading, setCommentLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(true);

  useEffect(() => {
    async function getComments() {
      setCommentLoading(true);
      try {
        const data = await getCommentsApi(detail);
        setComments(data.comments);
      } catch {
        console.log('404')
      } finally {
        setCommentLoading(false)
      }
    }
    async function getDetailPost() {
      setDetailLoading(true)
      try {
        const detailData = await getDetailApi(detail)
        setDetails(detailData)
      }
      catch {
        console.log('404')
      } finally {
        setDetailLoading(false)
      }
    }
    getDetailPost();
    getComments();
  }, []);
  // console.log(comments)
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-50 backdrop-filter backdrop-brightness-75 backdrop-blur-md">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col xl:w-9/12 bg-white outline-none focus:outline-none 2xl:p-10 xl:p-10 lg:p-10 md:p-5 sm:p-5 p-2  backdrop-blur-sm">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-0 right-0 xl:-mt-2 xl:-mr-2 text-white xl:bg-black lg:text-black xl:text-white max-[1024px]:text-black rounded-full w-10 h-10 flex items-center justify-center">
            x
          </button>
          {
            detailLoading ?
              <>
                <div className="h-10 bg-gray-200 animate-pulse rounded my-2">
                </div>
                <div className="h-32 bg-gray-200 animate-pulse rounded">
                </div>
              </>
              :
              <>
                <div className="xl:text-2xl font-bold">
                  {details?.title}
                </div>
                <div className="flex gap-1 my-2">
                  <span className="my-auto text-sm font-semibold">Tags:</span>
                  {
                    details?.tags.map((d: any, i: number) => (
                      <div key={i} className="text-sm p-1 bg-gray-200 rounded-md border-black">
                        {d}
                      </div>
                    ))
                  }
                </div>
                <div className="xl:text-xl md:text-md text-sm">
                  {details?.body}
                </div>
                <div className="flex my-2 gap-2">
                  <div className="flex">
                    <Image
                      className="my-auto"
                      src="/like.svg"
                      alt="like Logo"
                      width={16}
                      height={16}
                    />
                    {details?.reactions.likes}
                  </div>
                  <div className="flex">
                    <Image
                      className="my-auto"
                      src="/views.svg"
                      alt="views Logo"
                      width={16}
                      height={16}
                    />
                    {details?.views}
                  </div>
                </div>
                <div className="font-semibold">
                  Comments
                </div>
                {commentLoading ?
                  <div className="h-72 bg-gray-200">
                    Comments
                  </div>
                  :
                  comments.length > 0 ? 
                  <div className="xl:h-72 border-y overflow-auto">
                    {
                      comments?.map((d: any, i: any) => {
                        return (
                          <>
                            <div key={i} className="bg-gray-100 my-1 rounded p-1">
                              <div className="xl:text-xl text-sm font-semibold">
                                {d?.user?.username ?? ''}
                              </div>
                              <div className="xl:text-xl md:text-md text-sm">
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
                  </div>
                  : <>
                    <div className="text-center text-gray-400 h-72 border-y">
                      <div className="mt-3">
                        No comments yet
                      </div>
                    </div>
                  </>
                }
              </>
          }
        </div>
      </div>
    </>
  )
}