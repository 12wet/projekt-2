import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';
import { useNavigate } from "react-router-dom";

function Quote() {
  let { id } = useParams();
  const [quoteObject, setQuoteObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const {authState} = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/quotes/byId/${id}`).then((response) => {
      setQuoteObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
    // eslint-disable-next-line
  }, []);

  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
        QuoteId: id,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      })
      .then((response) => {
        if (response.data.error){
          alert(response.data.error)
        }
        else {
          const commentToAdd = response.data;
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios.delete(`http://localhost:3001/comments/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    })
    .then(() => {
      setComments(comments.filter((comment) => {
        return comment.id !== id;
      }))
    })
  }

  if(!authState.status){
    navigate("/login")
}

  return (
    <div className="quotePage">
      <div className="leftSide">
        <div className="quote" id="individual">
          <div className="title">{quoteObject.title}</div>
          <div className="body">{quoteObject.body}</div>
          <div className="username">Author: {quoteObject.username}</div>
          <div className="description">{quoteObject.description}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <div className="commentTop">
                  {comment.commentBody}
                </div>
                <div className="commentBot">
                  <label> Username: {comment.username}</label>
                  { authState.username === comment.username && <button onClick={() => { deleteComment(comment.id) }}> Delete </button> }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Quote;