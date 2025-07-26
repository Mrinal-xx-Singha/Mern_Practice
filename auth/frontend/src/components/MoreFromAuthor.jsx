import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreFromAuthor } from "../redux/slices/postSlice";
import { Link } from "react-router-dom";

const MoreFromAuthor = ({ authorId, currentPostId }) => {
  const dispatch = useDispatch();
  const { moreFromAuthor, loading } = useSelector((state) => state.posts);
  console.log(moreFromAuthor);

  useEffect(() => {
    if (authorId) {
      dispatch(fetchMoreFromAuthor({ authorId, exclude: currentPostId }));
    }
  }, [authorId, currentPostId]);

  if (loading) return <div>Loading more posts...</div>;

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-4">More From This Author</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {moreFromAuthor.map((post) => (
          <Link to={`/posts/${post._id}`} key={post._id}>
            <div className="border rounded-lg p-4 hover:shadow-md">
              <img
                src={
                  post.images.length > 0
                    ? post.images[0]
                    : "https://placehold.co/600x400/EEE/31343C?font=poppins&text=BlogPost"
                } // Only first image for thumbnail
                alt="Post thumbnail"
                className="w-full h-40 object-cover mb-2 rounded-md"
              />

              <h4 className="font-semibold text-md line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreFromAuthor;
