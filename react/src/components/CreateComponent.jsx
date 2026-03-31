import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const CreateComponent = () => {
    const [titleValue, setTitleValue] = useState('');
    const [titleError, setTitleError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const navigate = useNavigate();
    const apiurl = 'http://localhost:5092/api/Create';
    const backUrl = "/api/";
    const errorText = "Text must be at least 3 characters long and less 30"

    const validation = (value) => {
        return (value.length >= 3 && value.length <= 30);
    }

    const formHandler = (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target).entries());

        let tErr = !validation(formData.title);
        let aErr = !validation(formData.author);
        setTitleError(tErr ? errorText : '');
        setAuthorError(aErr ? errorText : '');
        if (tErr || aErr) {
            return
        }
        const data = { id: formData.id, title: formData.title, author: formData.author };
        const config = { headers: { 'Content-Type': 'application/json' } };
        axios.post(apiurl, data, config).then((resp) => {
            const id = resp.data[0].id;
            const newUrl = "/api/Book/Details/" + id;
            navigate(newUrl)
        }, []);

    }
    return (
        <div className="text-center">
            <h2>Create new book</h2>
            <ul>
                <form onSubmit={formHandler} className='plank'>
                    <p className="row">
                        <label>Title</label>
                        <input type="text"
                            value={titleValue}
                            onChange={(e) => setTitleValue(e.target.value)}
                            name="title"
                            placeholder="Title" />
                    </p>
                    {titleError && <p className='validate'>{titleError}</p>}
                    <p className="row">
                        <label>Author</label>
                        <input type="text" name="author" placeholder="Author" />
                    </p>
                    {authorError && <p className='validate'>{authorError}</p>}
                    <p className="row">
                        <Link to={backUrl}>
                            <button>Back</button>
                        </Link>
                        <button type="submit">Submit</button>
                    </p>
                </form>
            </ul>
        </div>
    );
};

export default CreateComponent;