import { getCommentsApi, getDetailApi } from "@/api/api"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Props {
  id : any
}

export const Comments = ({id}:Props) => {
  const [comments, setComments] = useState<any>()
  useEffect(() => {
    async function getAllPost() {
      try {
        const data = await getCommentsApi(id);
        setComments(data.comments);
      } catch {
        console.log('404')
      }
    }
    
    getAllPost();
    
  }, []);

  return (
    <>
      <div className="flex">
        <Image
          className="my-auto"
          src="/comment.svg"
          alt="comment Logo"
          width={16}
          height={16}
        />
        {comments?<span>
          {comments?.length}
        </span>:
        <span>
          0
        </span>
        }
      </div>
    </>
  )
}