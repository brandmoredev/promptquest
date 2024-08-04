import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const post = await Post.findById(params.id);

    if (!post) return new Response('Post not found', { status: 404})

    return new Response(JSON.stringify(post), { status: 200})

  } catch (error) {
    return new Response('Failed to get the post', { status: 500})
  }
}

export const PATCH = async (req, { params }) => {
  const { prompt, tag, userId } = await req.json();

  try {
    await connectToDB()
    const existingPost = await Post.findOne({ _id: params.id, creator: userId });

    if (!existingPost) return new Response('Post not found', { status: 404});

    existingPost.prompt = prompt;
    existingPost.tag = tag;

    await existingPost.save();

    return new Response(JSON.stringify(existingPost), { status: 200})

  } catch (error) {
    return new Response('Failed to update the post', { status: 500})
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const { userId } = await req.json();

    // Find the post by ID
    const post = await Post.findById(params.id);

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    // Check if the user is the owner of the post
    if (post.creator.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Delete the post
    await Post.findByIdAndDelete(params.id);

    return new Response('Post deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete the post', { status: 500 });
  }
}