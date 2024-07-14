"use client";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { getAllPostsApi } from "../../api/api";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "../pagination/pagination";
import { Comments } from "../comments/comments";
import Popup from "../popup/popup";

export const Posts = () => {
  const [posts, setPosts] = useState<PostsResponse>();
  // const [error, setError] = useState<string | unknown>(null);
  const [isLoading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0)
  const [isOpen, setOpen] = useState(false)
  const [detail, setDetail] = useState<string | undefined>()

  useEffect(() => {
    async function getAllPost() {
      setLoading(true);
      try {
        const data = await getAllPostsApi(skip);
        setPosts(data);
      } catch {
        // setError(error);
      } finally {
        setLoading(false);
      }
    }
    getAllPost();
  }, [skip]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleClick = (id : any) => {
    setDetail(id)
    setOpen(true)
  }

   return (
      <>
        <div className={`relative ${isOpen ? 'overflow-hidden' : ''}`}>
          <div>
            { isLoading ? 
              <div className="mx-auto text-center">Loading...</div>:
              <>
                <div className="w-full">
                  <div className="inline-block bg-black dark:white p-2 rounded text-white">{`Show ${posts?.limit} to ${posts?.total} Posts`}</div>
                </div>
                {posts?.posts.map((data: any, i: number) => (
                  <div key={i} className="w-full bg-gray-100 xl:p-6 p-3 rounded my-2">
                    <div className="xl:text-2xl font-semibold">
                      <Link href={`/post/${data.id}/detail`}>
                        {data.title}
                      </Link>
                    </div>
                    <div className="xl:text-lg text-sm text-gray-600 my-4">{data.body}</div>
                    <div className="my-2 flex gap-2">
                      <div className="flex">
                        <Image
                          className="my-auto"
                          src="/like.svg"
                          alt="like Logo"
                          width={16}
                          height={16}
                        />
                        {data.reactions.likes}
                      </div>
                      <button onClick={() => handleClick(data.id)} className="my-auto">
                        <Comments 
                        id={data.id} 
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            }
            <div className="flex justify-end">
              {posts && <Pagination
                skip={posts!.skip}
                limit={posts!.limit}
                total={posts!.total}
                page={skip}
                setPage={setSkip}
              />}
            </div>
            {isOpen && <Popup
              setOpen={setOpen}
              detail={detail}
            />}
          </div>
        </div>
      </>
    );
};
