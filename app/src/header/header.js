import {NavLink} from 'react-router-dom';
function Header() {

    const navLinks = [
        { to:'/', label: 'Home' },
        { to:'/about', label: 'About' },
        { to:'/recipes', label: 'Recipes' },
        { to:'/inventory', label: 'Inventory' },
    ]
    
    return (
        <header className='bg-teal-600 text-white pt-5 pb-5'>
             <nav className='flex gap-4 text-xl justify-center '>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                            `transition-colors hover:underline ${
                                isActive ? 'font-bold underline' : ''
                            }`}
                    >
                        {link.label}
                    </NavLink>))}
                </nav>
                
      <h1 className="text-4xl font-bold text-center pt-8 pb-8">Welcome to FlaskCart 🍓</h1>
           
        </header>
    );
}

export default Header;