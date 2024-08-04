'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const CreatorProfile = () => {
  const { data: session, status } = useSession();
  const [creator, setCreator] = useState(null);
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const creatorId = searchParams.get('id');


  useEffect(() => {
    if (status === "loading") return; // Wait until the session status is determined

    if (!session) {
      router.push('/'); // Redirect if no session exists
      return;
    }

    const fetchUser = async () => {
      const response = await fetch(`/api/users/${creatorId}/profile`);
      const user = await response.json();

      setCreator(user)
    }

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${creatorId}/posts`);
      const data = await response.json();
      
      setPosts(data);
    }

    if (creatorId) {
      fetchUser();
      fetchPosts();
    }
  }, [session])


  return (
    <Profile
      name="Creator"
      desc={`Welcome to ${creator?.username}'s profile page`}
      data={posts}
    />
  )
}

export default CreatorProfile
