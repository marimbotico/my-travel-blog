import React from 'react';
import { Button } from 'react-bootstrap';

const CommentsList = ({ comments, deleteComment }) => {
    return (
        <div>
            {comments.map((comment, index) => (
                <div key={index} className="comment-item">
                    <p>{comment}</p>
                    <Button variant="outline-danger" onClick={() => deleteComment(index)}>
                        Delete
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default CommentsList;
