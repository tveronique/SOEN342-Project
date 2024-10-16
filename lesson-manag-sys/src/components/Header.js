import '../App.css'
import logo from '../logo.svg'

export default function Header() {
    return (
        <header className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
             <h1>Actify</h1>
        </header>
    );
}
