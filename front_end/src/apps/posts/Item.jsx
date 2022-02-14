import { Link } from "react-router-dom";
import { useGetPostQuery } from "./_api";

const Item = ({ match }) => {
  const { data } = useGetPostQuery(match.params.id);
  return (
    <article className="post">
      {data ? (
        <>
          <h2>{data.data[0].attributes.title}</h2>
          <p>{data.data[0].attributes.body}</p>
          <footer>
            {/* {item.is_published ?
          <time>{new Date(item.updated).toLocaleDateString()}</time>
          :
          <span>Draft</span>
          } */}
            <Link to={`/posts`}>Return</Link>
          </footer>
        </>
      ) : null}
    </article>
  );
};

export default Item;

