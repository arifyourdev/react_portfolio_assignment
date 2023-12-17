import React, { useState } from 'react';
import folder from "../../images/photos.png"
import AlbumForm from '../albumform/AlbumForm';
import styles from "./albumlist.module.css";

import ImageForm from '../imageform/ImageForm';
const AlbumsList = ({ AlbumData }) => {

    const [show, setShow] = useState(false);
    const openAlbumForm = () => {
        setShow(true)
    }
     const [showList, setShowList] = useState(false);
     const [singleData, setSingleData] = useState(null);
    
    const handleOnlclick = (data) => {
        setShowList(true)
        setSingleData(data)
    }
 
     
     return (
        <>
             <div className={styles.App_content}>
                {showList ? (<>
                    <ImageForm 
                      singleData={singleData}
                      setShowList ={setShowList}
                    />
                 </>) : (<>

                    <div>
                        {show && <AlbumForm />}
                        <div className={styles.albumsList_top}>
                            <h3>Your albums</h3>
                            {show ? (
                                <button className={styles.albumsList_active} onClick={() => setShow(false)} >Cencil</button>
                            ) : (
                                <button className="false" onClick={openAlbumForm}>Add Album</button>
                            )}
                        </div>

                        <div className={styles.albumsList_albumsList}>
                            {/* Album List   */}
                            {AlbumData.map((data) => (
                                <div className={styles.albumsList_album} key={data.id} onClick={() => handleOnlclick(data)}>
                                    <img src={folder} alt="images" />
                                    <span>{data.name}</span>
                                </div>
                            ))}
                            {/* End */}
                        </div>
                    </div>
                </>)}
            </div>
        </>
    )
}

export default AlbumsList