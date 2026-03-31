import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const LibraryComponent = () => {
    const [books, setBooks] = useState();
    const apiurl = 'http://localhost:5092/api/';

    useEffect(
        () => {
            axios.get(apiurl).then((resp) => {
                console.log("OK", resp);
                const allBooks = resp.data;
                setBooks(allBooks);
            }).catch((err) => {
                console.log("Err", err);
            });
        }, [setBooks]);

    return (
        <div className="text-center">
            <div className="row">
                <h2>Library</h2>
                <p>
                    <Link to="/api/Create/">
                        <button>
                            Create book
                        </button>
                    </Link>
                </p>
            </div>


            <ul>
                {books?.map((book) => (
                    <li className="plank" key={book.id}>
                        <Link to={'Book/Details/' + book.id}>
                            <div className="row">
                                <p> {book.title} </p>
                                <p> {book.author} </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LibraryComponent;