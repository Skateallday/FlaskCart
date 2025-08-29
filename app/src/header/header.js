import Routes from '../routes/routes';


function Header() {
    
    return (
        <header className='bg-blue-500 pt-5 pb-5'>
            <h2 className='text-white text-3xltext-center'>FlaskCart - A simple inventory management system</h2>
            <Routes />
           
        </header>
    );
}

export default Header;