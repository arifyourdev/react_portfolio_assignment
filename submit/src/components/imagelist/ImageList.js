import React from 'react'
import styles from './imagelist.module.css';
import Warning from "../../images/warning.png";
import Edit from "../../images/edit.png";
import Delete from "../../images/trash-bin.png";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseInt';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast } from 'react-toastify';
const ImageList = ({imageData,updateImage}) => {

     const deleteImage = async (id) =>{
      try{
       const delRef = await deleteDoc(doc(db,'album_details',id));
         toast.success("Album Image is Deleted Sucessfully");
       }catch(e){
        console.log(e)
      }
     }
     
    return (
        <>
          <ToastContainer />
            <div className={styles.imageList_imageList}>
            {imageData.map((data) =>(    
                <div className={styles.imageList_image} key={data.id}>
                    <div className={styles.imageList_update}>
                        <img src={Edit} alt="update" onClick={() => updateImage(data.id)} />
                        <img src={Delete} onClick={() => deleteImage(data.id)} alt="delete" />
                    </div>
                     <img src={Warning} alt="wet" />
                    <span>{data.title}</span>
                </div>
            ))}
            </div>
        </>
    )
}

export default ImageList