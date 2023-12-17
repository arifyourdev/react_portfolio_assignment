import React, { useRef, useState } from 'react';
import styles from './albumform.module.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseInt';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const AlbumForm = () => {
     const [name,setName] = useState();
     const albumHandler = async (e) =>{
      e.preventDefault();
      try{
        const addRef = await addDoc(collection(db,'albums'),{
            name:name,
            createdOn:new Date()
        });
        toast.success("Album Added");
        setName("");
       }catch(e){
        console.log(e)
      }
    }
  
    return (
        <div>
            <ToastContainer/>
            <div className={styles.albumForm_albumForm}>
                <span>Create an album</span>
                <form onSubmit={albumHandler}>
                    <input type='text' name='name' value={name} onChange={(e) =>setName(e.target.value)} required=""  placeholder="Album Name" />
                    <button type="button" onClick={() =>setName("")}>Clear</button>
                    <button>Create</button></form>
            </div>
        </div>
    )
}

export default AlbumForm