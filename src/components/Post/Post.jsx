import { useState } from 'react';
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { updatePost, deletePost } from '../../services/api';
import './Post.css';

const Post = ({ post, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedImageUrl, setEditedImageUrl] = useState(post.imageUrl);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUpdate = async () => {
    try {
      const updatedPost = await updatePost(post.id, { 
        content: editedContent,
        imageUrl: editedImageUrl
      });
      onUpdate(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this post permanently?')) {
      try {
        await deletePost(post.id);
        onDelete(post.id);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article className="post-card">
      <header className="post-header">
        <div className="user-info">
          <div className="avatar">
            {post.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="username">{post.author}</h4>
            <time className="post-time">{formatDate(post.createdAt)}</time>
          </div>
        </div>
        
        <div className="post-actions">
          <button 
            className="dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FiMoreVertical />
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => {
                setIsEditing(true);
                setShowDropdown(false);
              }}>
                <FiEdit2 /> Edit
              </button>
              <button onClick={handleDelete}>
                <FiTrash2 /> Delete
              </button>
            </div>
          )}
        </div>
      </header>
      
      <div className="post-content">
        {isEditing ? (
          <div className="edit-mode">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              autoFocus
              className="edit-textarea"
            />
            <input
              type="text"
              value={editedImageUrl || ''}
              onChange={(e) => setEditedImageUrl(e.target.value)}
              placeholder="Image URL"
              className="edit-input"
            />
            <div className="edit-buttons">
              <button 
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button 
                className="save-button"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <p>{post.content}</p>
            {post.imageUrl && (
              <div className="post-image">
                <img src={post.imageUrl} alt="Post content" />
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default Post;