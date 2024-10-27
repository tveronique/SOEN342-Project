import '../App.css'
import logo from '../logo.svg'

export default function Header() {
    return (
        <div className="App-header">
        <div className="header-row">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Actify</h1>
        </div>
        <h2><i>Lesson scheduling made easy</i></h2>
        <div className='header-row-list'>
            <h5>Classes tailored to your preferences</h5>
            <h5>Lessons offered all across Quebec</h5>
            <h5>Competent instructors assigned to each offering</h5>
            <h5>Flexible services</h5>
        </div>
        <h2>Get started today</h2>
    </div>
    );
}
