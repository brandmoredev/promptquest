'use client'

import {featuredPosts} from '@utils/featurePosts';
import { useEffect, useState } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-6 prompt_layout'>
      {data.map(post => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        )
      })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filtered = posts.filter(post => 
      post.tag.toLowerCase().includes(value.toLowerCase()) || 
      post.creator.username.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPosts(filtered);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
  
    const filtered = posts.filter(post => 
      post.tag.toLowerCase().includes(tag.toLowerCase())
    );
  
    setFilteredPosts(filtered);
  }

  const handleClearSearch = () => {
    setSearchText('');
    setFilteredPosts(posts);
  }

  //Fetch all posts from database
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data); 
    }

    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
        { searchText?.length > 0 &&
          <span
            className='text-gray-500 absolute right-5 cursor-pointer'
            onClick={handleClearSearch}
          >
            Clear
          </span>
        }
      </form>

      {searchText.length === 0 ? (
        <div className='mt-6 prompt_layout'>
          {featuredPosts.map((post, index) => {
            return (
              <PromptCard post={post} key={index} handleTagClick={handleTagClick}/>
            )
          })}
        </div>
      ) : (
        filteredPosts?.length === 0 ?
          <p className='text-center text-gray-500 mt-4'>No posts found.</p> :
          <PromptCardList
            data={filteredPosts}
            handleTagClick={handleTagClick}
          />
      )}
    </section>
  )
}

export default Feed
