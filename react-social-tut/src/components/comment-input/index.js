import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebase';
import "./style.css";

export default function CommentInput({comments, id}) {

    const [user, setUser] = useContext(UserContext).user;
    const [comment, setComment] = useState("");
    const [commentArray, setCommentArray] = useState(comments ? comments:[]);

    const addComment =() =>{
        //add comment to the post info

        commentArray.push({
            comment:comment,
            username:user.email.replace("@gmail.com","").toLowerCase(),
        });

        db.collection("posts").doc(id).update({
            comments: commentArray,
        }).then(function(){
            setComment("");
            console.log("comment added")
        }).catch(function(error){
            console.log(`Error ${error}`)
        });
    }

    return (
        <div className="commentInput">    
        <textarea placeholder="Write a comment.." value={comment} className="commentInput_textarea" rows="1" onChange={(e)=> setComment(e.target.value)}></textarea>        
        
        <button className="commentInput_btn" onClick={addComment}>Post</button>
        </div>
    )
}
