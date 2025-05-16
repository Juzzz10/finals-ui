import { useState, useEffect } from 'react';
import Post from '../Post/Post';
import PostForm from '../Post/PostForm';
import { getPosts } from '../../services/api';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="feed">
      <PostForm onPostCreated={handlePostCreated} />
      <div className="posts-list">
        {posts.length > 0 ? (
          posts.map(post => (
            <Post
              key={post.id}
              post={post}
              onUpdate={handlePostUpdated}
              onDelete={handlePostDeleted}
            />
          ))
        ) : (
          <div className="no-posts">No posts yet. Be the first to post!</div>
        )}
      </div>
    </div>
  );
};

export default Feed;