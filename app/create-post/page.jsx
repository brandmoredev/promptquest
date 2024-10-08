'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from '@components/Form'


const CreatePost = () => {
  const {data: session} = useSession();
  const router = useRouter();
  if (!session) router.push('/');

  const [submitting, setSubmitting] =useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id
        })
      })

      if(response.ok) router.push('/profile')
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  )
}

export default CreatePost;
