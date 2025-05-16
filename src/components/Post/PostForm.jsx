import { useState } from 'react';
import { createPost } from '../../services/api';
import './Post.css';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const newPost = await createPost({ 
        content,
        imageUrl: imageUrl.trim() || null,
        author: author.trim() || 'Anonymous'
      });
      onPostCreated(newPost);
      setContent('');
      setImageUrl('');
      setAuthor('');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Create Post</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Add image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="form-input"
          />
        </div>
        <button 
          type="submit" 
          className="submit-button"
          disabled={!content.trim()}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;