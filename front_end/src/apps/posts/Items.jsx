import { Link } from "react-router-dom";

const ListItems = ({ item, uid }) => {
  return (
    <article className="post">
      <h2>
        <Link to={`/posts/${uid}`}>{item.title}</Link>
      </h2>
      <p>{item.body}</p>
      <footer>
        {/* {item.is_published ?
                    <time>{new Date(item.updated).toLocaleDateString()}</time>
                    :
                    <span>Draft</span>
                } */}
        <Link to={`/posts/edit/${uid}`}>Edit</Link>
      </footer>
    </article>
  );
};

export default ListItems;

