import React, { useContext, useState } from 'react';
import { Comment } from '../../components';
import CommentInput from '../../components/comment-input';
import { UserContext } from '../../contexts/user';
import { db, storage } from '../../firebase';
import "./style.css"

export default function Post({

    profileUrl,username,id,photoURL,caption,comments,
}) {
    const [user, setUser] = useContext(UserContext).user;
    const deletePost = () =>{
        //delete the image from firebase storage
        
        //get ref to the image file we like to delete
        var imageRef = storage.refFromURL(photoURL);

        //delete the file
        imageRef.delete().then(function(){
            console.log("delete successful");
        }).catch(function(error){
            console.log(`Error ${error}`);
        });

        //2 delete the post info from firebase firestore

        db.collection("posts")
        .doc(id)
        .delete()
        .then(function(){
            console.log("delete successful");
        }).catch(function(error){
            console.log(`Error ${error}`);
        });
    };    
    return (
        <div className="post">

            <div className="post_header">
                <div className="post_header_left">
                    <img className="post_profile_pic" src={profileUrl} />  
                    <p style={{marginLeft:"8px"}}>{username}</p>
                </div>
                {user?<button onClick={deletePost} className="post_delete">Delete</button>  :<></>}
                
            </div>
            <div className="post_center">
                <img className="post_photoURL" src={photoURL}/>
            </div>

            <div>
                <p><span style={{fontWeight:"500", marginRight:"4px"}}>{username}</span>
                {caption}
                </p>
                </div>


                { comments ? comments.map((comment)=>(
                <Comment username={comment.username} caption={comment.comment} />)) : (<></>)}

                
                {user ?                 <CommentInput comments = {comments} id={id} />
:<></>}
                
        </div>
    )
}
