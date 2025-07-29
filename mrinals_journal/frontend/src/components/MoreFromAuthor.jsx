import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreFromAuthor } from "../redux/slices/postSlice";
import { Link } from "react-router-dom";

const fallbackImage =
  "https://placehold.co/600x400/EEE/31343C?font=poppins&text=BlogPost";

const MoreFromAuthor = ({ authorId, currentPostId }) => {
  const dispatch = useDispatch();
  const { moreFromAuthor, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (authorId) {
      dispatch(fetchMoreFromAuthor({ authorId, exclude: currentPostId }));
    }
  }, [authorId, currentPostId]);

  if (loading)
    return <div className="text-center py-4">Loading more posts...</div>;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        More From This Author
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {moreFromAuthor?.map((post) => (
          <Link to={`/posts/${post._id}`} key={post._id}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img
                src={post.images?.[0] || fallbackImage}
                alt="Post thumbnail"
                className="w-full h-48 object-contain md:object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreFromAuthor;
