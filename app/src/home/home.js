import { NavLink } from "react-router-dom";

import "./index.css";

import GetRecipes from "../recipes/getrecipes";
import Contact from "../contact/contact";

function Home() {
  return (
    <>
      <section className="home-hero flex min-h-[70vh] items-center md:min-h-[78vh]">
        <div className="relative z-10 w-full px-6 py-16 sm:px-10 md:px-16 lg:px-20">
          <div className="max-w-2xl">
            <h1 className="mb-4 font-bold leading-tight text-white text-4xl sm:text-5xl lg:text-6xl">
              Welcome to FlaskCart
            </h1>

            <h2 className="mb-5 text-2xl font-medium text-white sm:text-3xl lg:text-4xl">
              Let&apos;s get cookin&apos;!
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Plan your meals, keep track of your pantry, and discover recipes using what you already have.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <NavLink
                to="/recipes"
                className="rounded-lg bg-teal-700 px-6 py-3 font-bold text-white shadow-md transition hover:bg-teal-400 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-900"
              >
                Browse recipes
              </NavLink>

              <NavLink
                to="/inventory"
                className="rounded-lg border-2 border-white bg-white/5 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-900"
              >
                View pantry
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="text-3xl" aria-hidden="true">
              🍲
            </span>

            <h2 className="mt-2 font-bold text-slate-900">
              Check out our recipes
            </h2>

            <p className="mt-2 text-slate-600">
              Simple, delicious meals for every occasion.
            </p>
          </div>

          <GetRecipes limit={3} showControls={false}/>

          <div className="mt-10 text-center">
            <NavLink
              to="/recipes"
              className="inline-flex items-center rounded-lg border-2 border-teal-600 px-6 py-3 font-bold text-teal-700 transition hover:bg-teal-600 hover:text-white"
            >
              View all recipes
            </NavLink>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Contact />
        </div>
      </section>
    </>
  );
}

export default Home;