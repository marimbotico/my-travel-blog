import { Link } from "react-router-dom";
import "./CommentsList.css";
import Accordion from 'react-bootstrap/Accordion';

const CommentsList = ({ comments = [] }) => {
    return (
        <Accordion defaultActiveKey={comments[0]}>
            {comments.map((comment, index) => (
                <Accordion.Item key={index} eventKey={index}>
                    <Accordion.Header> Comment # {index + 1}</Accordion.Header>
                    <Accordion.Body>{comment}</Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
};

export default CommentsList;
