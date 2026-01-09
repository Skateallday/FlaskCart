import {NavLink} from 'react-router-dom';
function Header() {

    const navLinks = [
        { to:'/', label: 'Home' },
        { to:'/about', label: 'About' },
        { to:'/recipes', label: 'Recipes' },
        { to:'/inventory', label: 'Inventory' },
    ]
    
    return (
        <header className='relative'>
             <nav className='bg-teal-600 w-full text-white py-5 flex gap-4 text-xl justify-center mb-4 sticky top-0'>
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
                
           
        </header>
    );
}

export default Header;