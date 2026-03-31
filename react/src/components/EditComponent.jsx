import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const EditComponent = (curId) => {
    const [books, setBooks] = useState();
    const navigate = useNavigate();
    const apiurl = 'http://localhost:5092/api/Details?Id=' + curId;
    const remUrl = 'http://localhost:5092/api/Remove?Id=' + curId;
    const backUrl = "/api/Book/Details/" + curId;
    const putUrl = 'http://localhost:5092/api/Update/';

    useEffect(
        () => {
            axios.get(apiurl).then((resp) => {
                console.log("OK", resp);
                const allBooks = resp.data;
                setBooks(allBooks);
            }).catch((err) => {
                console.log("Err", err);
                setBooks([]);
            });
        }, [setBooks]);


    const removeHandler = (e) => {
        axios.delete(remUrl).then((resp) => {
            navigate('/api/')
        }, []);
    }

    const formHandler = (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target).entries());
        const data = { id: formData.id, title: formData.title, author: formData.author };
        const config = { headers: { 'Content-Type': 'application/json' } };
        axios.put(putUrl, data, config).then((resp) => {
            navigate(backUrl)
        }, [setBooks]);
    }

    return (
        <div class="text-center">
            <h2>Edit book</h2>
            <ul>
                {books?.map((book) => (
                    <form onSubmit={formHandler} className="plank">
                        <p className="row">
                            <label>Title</label>
                            <input type="text" name="title" defaultValue={book.title} placeholder="Title" />
                        </p>
                        <p className="row">
                            <label>Author</label>
                            <input type="text" name="author" defaultValue={book.author} placeholder="Author" />
                        </p>
                        <input type="hidden" name="id" value={book.id} />
                        <p className="row">
                            <button onClick={removeHandler}>Remove</button>
                            <Link to={backUrl}>
                                <button>Back</button>
                            </Link>
                            <button type="submit">Submit</button>
                        </p>
                    </form>
                ))}
            </ul>
        </div>
    );
};

export default EditComponent;