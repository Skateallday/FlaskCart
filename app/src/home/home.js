import "./index.css"
import GetRecipes from "../recipes/getrecipes";
import Contact from "../contact/contact";

function Home() {    
    
    return (
        <>
        <div className="home-hero">   
            <div className="intro-text">   
            <h1 className=" py-5 font-bold text-center pb-8">Welcome to FlaskCart </h1>
            <h2>Let's get cookin!</h2>
        <p>Are you constantly creating new shopping lists each week? Never quite sure what you have in the house? Looking for something
            new to cook with what you already have? Well, we've got you sorted!</p>
            <p>Developed by an ex-Chef turned Developer, FlaskCart will help you keep on top of your pantry.</p>
        </div>
        </div>
        <section className="recipe-intro bg-teal-600 w-full p-4  shadow-md">
        <h2 className="py-5 font-bold text-center mt-8 pb-8">Check out our recipes</h2>
        <GetRecipes />
        </section>
        
        <section className="w-full p-4">
        <Contact />
        </section>
        </>
    );
}

export default Home;