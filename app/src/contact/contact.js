import { BASE_URL } from "../config/config";

const csrfToken = document.cookie
  .split("; ")
  .find(row => row.startsWith("csrf_token="))
  ?.split("=")[1];

export default function Contact() {

async function sendContactForm(event){
    event.preventDefault();
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      credentials: "include",
      body: JSON.stringify({})
    });

    if(!res.ok) throw new Error("Failed to send message");

  }


  return (
      
      <div className="w-full flex flex-wrap ">

      <div className="w-full bg-white flex flex-col p-4 m-4 rounded shadow-md">
        
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl py-5 font-bold text-center mt-8 pb-8">
        Contact us
      </h2>
        <p>Have questions about our recipes, ingredients, or anything else? We're here to help! Please fill out the form on the left and we'll get back to you as soon as possible.</p>
        <p>In the meantime, why don't  you check out some of our recipes here?</p>
        <p><a href="/recipes" className="py-4 text-teal-600 hover:underline">
          View Our Recipes
        </a></p>
      </div>
        <form className="max-w-3xl" onSubmit={sendContactForm}>
          <label
            htmlFor="fullname"
            className="block text-gray-700 pt-2 text-sm font-bold mb-2"
          >
            Full name
          </label>
          <input name="fullname" type="text" className="border p-2 w-full" placeholder="Full name" />

          <label
            htmlFor="email"
            className="block text-gray-700  pt-2 text-sm font-bold mb-2"
          >
            Email address
          </label>
          <input name="email" type="email"  className="border p-2 w-full" placeholder="Email address" />

          

          <label htmlFor="message" className="block text-gray-700 pt-2 text-sm font-bold mb-2">Your message</label>
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
