import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookComponent = (curId) => {
    const [books, setBooks] = useState();
    const apiurl = 'http://localhost:5092/api/Details?Id=' + curId;

    useEffect(
        () => {
            axios.get(apiurl).then((resp) => {
                const allBooks = resp.data;
                setBooks(allBooks);
            }).catch((err) => {
                console.log("Err", err);
            });
        }, [setBooks]);
    return (
        <div class="text-center">
            <h2>Book</h2>
            <ul>
                {books?.map((book) => (
                    <li className="plank" key={book.id}>
                        <h3> {book.title} </h3>
                        <div className="row">
                            <span> {book.author} </span>
                            <Link to={"Edit/"}>
                                <button>Edit</button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookComponent;