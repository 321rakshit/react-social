import React, { useContext, useState } from 'react'
import { SignInBtn } from '../../components'
import { UserContext } from '../../contexts/user'
import "./style.css"

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import makeid from '../../helper/functions';
import { db, storage } from '../../firebase';
import firebase from "firebase"



export default function CreatePost() {
    const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

            var imagePreview = document.getElementById("image-preview")

            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";

        }

    };   

    const handleUpload = () =>{
        if(image){
            var imageName = makeid(10);
            const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);
            
            uploadTask.on("state_changed",(snapshot) => {
                //progress function
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);    
            
                setProgress(progress);
            }, (error) =>{
                console.log(error);
            }, ()=>{
                //get download url and upload the post info
                storage.ref("images").child(`${imageName}.jpg`).getDownloadURL()
                .then((imageUrl)=> {

                    db.collection("posts").add({
                        timestamp:
                        firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        photoUrl:imageUrl,
                        username: user.email.replace("@gmail.com",""),
                        profileUrl: user.photoURL

                    });
                });
                setCaption("");
                setProgress(0);
                setImage(null);
                
            });
        }
    };
    return (
        <div className = "createPost">

            {user ?
            <div className="createpost_loggedin">
                <p>Create Post </p>
                <div className="createpost_loggedincenter">
                    <textarea placeholder="Enter caption here" className="createpost_textarea" rows="3" value={caption} onChange={(e) => setCaption(e.target.value)}>

                    </textarea>
                    <div className="createpost_imagepreview">
                        <img id="image-preview" alt="" />
                    </div>
                    <div className="createpost_loggedinbottom">
                    <div className="createpost_imageupload">
                        <label htmlFor="fileinput">
                        <AddAPhotoIcon style={{cursor:"pointer", fontSize:"20px"}}/>
                        </label>
                        <input id="fileinput"type="file" accept="image/*" onChange={handleChange}>

                        </input>
                    </div>
                    <button className="createPost_uploadBtn" onClick={handleUpload} style={{color: caption? "#000": "lightgrey"}}>
                    {`Upload ${progress != 0 ? progress: ""}`}</button>
                    </div>
                </div> 
            </div>
            
            :
            <div>
                <SignInBtn></SignInBtn>
                <p style={ {marginLeft: "12px"}}>To create and post!</p>
            </div>
            }
            
            
        </div>
    )
}
