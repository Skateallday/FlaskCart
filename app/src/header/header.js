import Search from './search/searchbar';
import Routes from './routes/routes';


function Header() {
    
    return (
        <header>
            <h1>FlaskCart</h1>
            <Search />
            <nav>
                <Routes />
            </nav>
        </header>
    );
}

export default Header;