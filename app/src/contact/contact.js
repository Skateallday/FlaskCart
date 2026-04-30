export default function Contact() {



  return (
    <div className=" mx-auto p-4 space-y-4">
      <h2 className="text-2xl py-5 font-bold text-center mt-8 pb-8">
        Contact us
      </h2>
      <div className="w-full bg-white max-w-xs flex flex-col p-4 m-4 rounded shadow-md">
        <form>
          <label
            for="fullname"
            className="block text-gray-700 pt-2 text-sm font-bold mb-2"
          >
            Full name
          </label>
          <input name="fullname" type="text" className="border p-2 w-full" placeholder="Full name" />

          <label
            for="email"
            className="block text-gray-700  pt-2 text-sm font-bold mb-2"
          >
            Email address
          </label>
          <input name="email" type="email"  className="border p-2 w-full" placeholder="Email address" />

          

          <label for="message" className="block text-gray-700 pt-2 text-sm font-bold mb-2">Your message</label>
          <textarea name="message"  className="border w-full p-2" placeholder="Your message" />
          <button
            className="bg-teal-600 flex text-black font-bold px-4 py-2 rounded mt-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
