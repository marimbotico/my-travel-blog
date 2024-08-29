import React from 'react';
import { Button } from 'react-bootstrap';

const CommentsList = ({ comments, deleteComment }) => {// passes 2 props the comments of all the posts plus the deleteComment function
    return (
        <div>
            {comments.map((comment, index) => (//maps over every comment
                <div key={index} className="comment-item">
                    <p>{comment}</p>
                    {/* onClick will call the deleteComment function with the specific index of which comment to delete */}
                    <Button variant="outline-danger" onClick={() => deleteComment(index)}>
                        Delete
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default CommentsList;
