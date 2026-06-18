import Contact from "../contact/contact.js";

function About() {
    
    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
            <h2 className="font-bold text-center pt-8 pb-8">About FlaskCart</h2>
            <p>FlaskCart is an open-source inventory and recipe management application designed to help users efficiently manage their kitchen supplies and meal planning. Built with a Flask backend and a React frontend, FlaskCart offers a seamless user experience for tracking ingredients, browsing recipes, and organising shopping lists.</p>
            <p>Whether you're a home cook or a professional chef, FlaskCart provides the tools you need to keep your kitchen organised and your meals delicious.</p>
            <p>FlaskCart has been created by Jamfish. This is a passion project, combining my previous work experience as a chef and my current position as a frontend developer together. If you've found anything on this site, from a dodgy looking recipe to a strange looking viewport I'd love to know. Please fill out the contact form and I'll be sure to get back to you ASAP. </p>
            <Contact />          

        </div>
    );
}

export default About;