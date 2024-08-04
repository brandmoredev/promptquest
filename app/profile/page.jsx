'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`)
  }
  const handleDelete = async(post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if(hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
          body: JSON.stringify({
            userId: session.user.id
          })
        })

        if (response.ok) {
          const filteredPost = posts.filter((p) => p._id !== post._id)
          setPosts(filteredPost)
        }

      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (status === "loading") return; // Wait until the session status is determined

    if (!session) {
      router.push('/'); // Redirect if no session exists
      return;
    }

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      
      setPosts(data);
    }

    if (session?.user.id) fetchPosts();
  }, [session])


  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
