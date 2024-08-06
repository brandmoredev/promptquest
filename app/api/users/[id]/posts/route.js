import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const posts = await Post.find({
      creator: params.id
    }).populate({
      path: 'creator',
      select: '-email'
    })

    return new Response(JSON.stringify(posts), { status: 200})

  } catch (error) {
    return new Response('Failed to fetch all posts', { status: 500})
  }
}
