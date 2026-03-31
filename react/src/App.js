import { BrowserRouter, Route, Routes, Link, useParams } from 'react-router-dom';

import './App.css';
import LibraryComponent from './components/LibraryComponent';
import BookComponent from './components/BookComponent';
import EditComponent from './components/EditComponent';
import CreateComponent from './components/CreateComponent';
import HomeComponent from './components/HomeComponent';

function NotFound() {
  return <h2>Not found</h2>;
}

function Book() {
  const {Id} = useParams();
  return BookComponent(Id);
}

function EditBook() {
  const {Id} = useParams();
  return EditComponent(Id);
}

function MyLink(txt, link) {
  return (
    <span>
      <Link to={link}>{txt}</Link>
    </span>
  )
}

function MyMenu() {
  return (
    <div>
      <BrowserRouter>
        <nav>
        {MyLink("Home", "/")}
        {MyLink("Library", "/api/")}
      </nav>
        <Routes>
          <Route path='/' Component={HomeComponent} />
          <Route path='/api/book/Details/:Id/Edit/' Component={EditBook} />
          <Route path='/api/book/Details/:Id' Component={Book} />
          <Route path='/api/Create/' Component={CreateComponent} />
          <Route path='/api/' Component={LibraryComponent} />
          <Route path='*' Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function App() {
  return (
    <div>
      <MyMenu />
    </div>
  )
}

export default App;
