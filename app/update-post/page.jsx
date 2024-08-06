'use client'

import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from '@components/Form';


const EditPost = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (!session) router.push('/');

  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [submitting, setSubmitting] =useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  useEffect(() => {
    if (status === 'loading') return; // Wait until the session data is fully loaded
    if (!session) {
      router.push('/');
      return;
    }

    const getPostDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${postId}`, {
          method: 'GET',
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
    
        const data = await response.json();

        setPost(data);
      } catch (error) {
        console.error(error);
      }
    }

    getPostDetails();
  }, [postId])

  const updatePost = async (e) => {
    console.log(session.user)
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${postId}`, {
        method: 'PATCH',
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
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  )
}


const UpdatePost = () => {
  return(
    <Suspense fallback={<p>Loading...</p>}>
      <EditPost />
    </Suspense>
  )
}


export default UpdatePost;
