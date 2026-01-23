import "./index.css"
import About from "../about/about";
import GetRecipes from "../recipes/getrecipes";
import Contact from "../contact/contact";

function Home() {    
    
    return (
        <div>      
            <h1 className="text-4xl py-5 font-bold text-center mt-8 pb-8">Welcome to FlaskCart </h1>
        <About />
        <h2>Check out our recipes</h2>
        <GetRecipes />
        <Contact />
        
        </div>
    );
}

export default Home;