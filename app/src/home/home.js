import "./index.css"
import About from "../about/about";
import GetRecipes from "../recipes/getrecipes";
import Contact from "../contact/contact";

function Home() {    
    
    return (
        <div>      
            <h1 className="text-4xl py-5 font-bold text-center mt-8 pb-8">Welcome to FlaskCart </h1>
        <About />
        <section className="bg-teal-600 w-full p-4 mt-8 shadow-md">
        <h2 className="text-2xl py-5 font-bold text-center mt-8 pb-8">Check out our recipes</h2>
        <GetRecipes />
        </section>
        
        <section className=" w-full p-4 mt-8 shadow-md">
        <Contact />
        </section>
        </div>
    );
}

export default Home;