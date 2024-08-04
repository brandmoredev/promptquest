import Feed from '@components/Feed'

const Home = () => {

  return (
    <section className='w-full flex-center flex-col mt-6'>
       <h1 className='head_text text-center'>
          Discover. Share. Inspire.
          <br className='max-md:hidden' />
          <span className='purple_gradient text-center'> AI Creativity with PromptQuest</span>
        </h1>
        <p className='text-center mt-4'>
          Dive into <strong>PromptQuest</strong>, your ultimate destination for discovering and sharing cutting-edge AI prompts. Connect with a vibrant community, spark your creativity, and contribute your ideas to elevate your AI projects and imaginative pursuits.
        </p> 

        <Feed />
    </section>
  )
}

export default Home
