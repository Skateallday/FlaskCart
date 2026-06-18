export default function ThankYou() {



  return (
    <div className=" mx-auto p-4 space-y-4">
      <h2 className="text-2xl py-5 font-bold text-center mt-8 pb-8">
        Thank you for contacting us! We will get back to you as soon as possible.
      </h2>
      <div className="w-full bg-white max-w-xs flex flex-col p-4 m-4 rounded shadow-md">
        <p>In the meantime, why don't  you check out some of our recipes here?</p>
        <p><a href="/recipes" className="text-teal-600 hover:underline">
          View Our Recipes
        </a></p>
      </div>
    </div>
  );
}
