import { Link } from "react-router-dom";
import { useGetPostsQuery } from "./_api";
import Items from "./Items";
const List = () => {
  const { data } = useGetPostsQuery();
  return (
    <main>
      <header className="post-header">
        <Link className="btn btn-primary" to="/posts/add/">
          Add Post
        </Link>
      </header>
      {data
        ? data.data.map(({ id, attributes }) => (
            <Items item={attributes} key={id} uid={id} />
          ))
        : null}
    </main>
  );
};

export default List;
