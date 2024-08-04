import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter  } from 'next/navigation';
import { useSession } from 'next-auth/react';


const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);
  
  // Check if the text is longer than 100 characters
  const prompt = post.prompt
  const isLongText = prompt.length > 100;
  
  // Truncate text if not expanded
  const truncatedText = isLongText ? `${prompt.slice(0, 500)}...` : prompt;

  const handleProfileClick = (post) => {
    if (status === "loading") return
    if (post.creator._id === session?.user?.id) {
      router.push('/profile')
    } else {
      router.push(`/creator?id=${post.creator._id}`)
    }
  }

  //Copy prompt to clipboard
  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000)
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={() => {handleProfileClick(post)}}
        >
          <Image
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
            <Image
              src={copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
              }
              width={12}
              height={12}
              alt='copy image'
            />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {isExpanded ? prompt : truncatedText}
        {isLongText && (
          <button
            className='text-blue-500 hover:underline text-sm'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        )}
      </p>

      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      
      {/* Show Edit and Delete button when user is signed in and on his profile page */}
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='flex justify-end'>
          <p
            className='font-inter text-sm purple_gradient cursor-pointer mx-2'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
