'use server'

export const getAllPostsApi = async (skip : number) => {
   const res = await fetch(`https://dummyjson.com/posts?limit=10&skip=${skip}`,{
    cache : 'no-store'
   })

   if(!res.ok){
    throw new Error('Failed to fetch data')
   }else{
    return res.json();
   }
}

export const getCommentsApi = async (id : any) => {
   const res = await fetch(`https://dummyjson.com/posts/${id}/comments`,{
    cache : 'no-store'
   })
   if(!res.ok){
    throw new Error('Failed to fetch data')
   }else{
    return res.json();
   }
}

export const getDetailApi = async (id : any) => {
   const res = await fetch(`https://dummyjson.com/posts/${id}`,{
    cache : 'no-store'
   })
   if(!res.ok){
    throw new Error('Failed to fetch data')
   }else{
    return res.json();
   }
}

export const getAllCommentsApi = async (limit? : number) => {
   const res = await fetch(`https://dummyjson.com/comments?limit=${limit}&skip=0`,{
    cache : 'no-store'
   })
   if(!res.ok){
    throw new Error('Failed to fetch data')
   }else{
    return res.json();
   }
}