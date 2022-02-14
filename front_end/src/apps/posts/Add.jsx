import React from 'react'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useAddPostMutation } from "./_api";
import { useState } from "react";

const Add = () => {
    // const today = new Date().toLocaleDateString('en-CA');
    const history = useHistory();

    const [post, setpost] = useState({ id: "", title: "", body: "", is_published: true});
    const [addPost, { isLoading: updating, isSuccess: saved }] = useAddPostMutation();

    const savePost = (e) => {
        e.preventDefault();
        addPost(post);
        goBack(700);
    };

    const inputHandler = (e) => {
        const { name, value, checked } = e.target;
        let theValue = name === "is_published" ? checked : value
        setpost({ ...post, [name]: theValue });
    };

    const goBack = (time) => {
        setTimeout(() => {
            history.push("/posts/");
        }, time);
    };

    return (
        <form onSubmit={savePost} className="form">
            <h2>Add Post</h2>

            <label>Title</label>
            <input onChange={inputHandler} name="title" id="title" type="text" className="form-control" required />

            <label>Body</label>
            <textarea onChange={inputHandler} name="body" id="body" className="form-control" rows="10"></textarea>

            <input onChange={inputHandler} name="is_published" id="is_published" type="checkbox" className="form-checkbox" checked={post.is_published} />
            <label htmlFor="is_published">Publishd</label>

            <footer className="form-footer">
                <Link className="btn btn-default" to="/">Cancel</Link>
                <button className="btn btn-primary" type="submit">{updating ? "Adding..." : "Add"}</button>
            </footer>
            {
                saved && (
                    <div className="alert alert-primary">
                        Post added. redirecting...
                    </div>
                )
            }
        </form>
    )
}

export default Add
