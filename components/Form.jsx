import Link from "next/link"

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className="head_text text-left">
        <span className="purple_gradient">{type} Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        Unlock limitless creativity: Share brilliant AI prompts and inspire innovation worldwide.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
        </label>

        <textarea
          value={post.prompt}
          onChange={(e) => setPost({...post, prompt: e.target.value})}
          placeholder="Write your prompt here..."
          required
          className="form_textarea"
        />

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
          </span>
          <span className="font-normal"> (#projectmanagement, #idea, #productivity)</span>
        </label>

        <input
          value={post.tag}
          onChange={(e) => setPost({...post, tag: e.target.value})}
          placeholder="#tag"
          required
          className="form_input"
        />

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href='/' className="text-gray-500 text-small">
            Cancel
          </Link>


          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-purple-600 rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>

      </form>
    </section>
  )
}

export default Form
