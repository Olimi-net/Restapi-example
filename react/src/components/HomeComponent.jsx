import logo from '../logo.svg';

const HomeComponent = () => {
    return (
        <div class="text-center">
            <h2>Example library with React</h2>
            <div className="img-block plank">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <p>Created by Olimi</p>
        </div>
    )
}

export default HomeComponent;