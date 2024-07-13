interface PostsResponse {
  posts : []
  total : number
  skip : number
  limit : number
}

interface DetailResponse {
  title : string
  body : string
  tags: string[]
  reactions : reaction
  views : number
  userId : number
}
interface reaction {
  likes : number
  dislikes : number
}

interface CommentsResponse {
  data : Comments
}

interface Comments {
  body: string
  likes : number
  user: UserComments
}

interface UserComments {
  username : string
  fullName : string
}