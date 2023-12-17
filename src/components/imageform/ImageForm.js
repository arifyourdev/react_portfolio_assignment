import { addDoc, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import backImg from "../../images/back.png"
import { db } from '../../firebaseInt';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import styles from "../albumlist/albumlist.module.css";
import ImageList from '../imagelist/ImageList';
import Search from "../../images/search.png";
import Clear from "../../images/clear.png";
const ImageForm = ({ singleData, setShowList }) => {

    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageData, setImageData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [imageId, setImageId] = useState(null);

    const openImageForm = () => {
        setOpenForm(true)
    }

    // Get Image Data
    const updateImage = (id) => {
        setIsEditing(true);
        const selectedImage = imageData.find((image) => image.id === id);
        setTitle(selectedImage.title);
        setImageUrl(selectedImage.imageUrl);
        setOpenForm(true);
        setImageId(id);
    };

    const singelImageHandler = async (e) => {
        e.preventDefault();
        if (isEditing) {
            const ImageUpdate = imageData.find((data) => data.id === imageId);
            await updateDoc(doc(db, 'album_details', imageId), {
                title: title,
                imageUrl: imageUrl,
                createdOn: new Date()
            });
            toast.success("Album Image Updated");
            setTitle(""); setImageUrl(""); setIsEditing("");
        } else {
            try {
                const addData = await addDoc(collection(db, 'album_details'), {
                    album_id: singleData.id,
                    title: title,
                    imageUrl: imageUrl,
                    createdOn: new Date()
                });

                toast.success("Album Image Added");
                setImageUrl(""); setTitle("");
            } catch (e) {
                console.log(e)
            }
        }
    }
    const clearData = () => {
        setTitle(""); setImageUrl("");
    }

    // For Hiding Form
    const cencilForm = () => {
        setOpenForm(false);
        setImageUrl(""); setTitle("");
        setIsEditing("")
    }
    //  diplay Image Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(query(collection(db, 'album_details'), where('album_id', '==', singleData.id)));
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                setImageData(data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
        const unsubscribe = onSnapshot(query(collection(db, 'album_details'), where('album_id', '==', singleData.id)), (snapshot) => {
            const updatedData = [];
            snapshot.forEach((doc) => {
                updatedData.push({ id: doc.id, ...doc.data() });
            });
            setImageData(updatedData);
        });

        return () => unsubscribe();
    }, [singleData.id]);

    const [searchOpen, setSearchOpen] = useState(false);
    const openSearch = () => {
        setSearchOpen(true)
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // Function to handle search input changes
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        filterData(term);
    };

    // Function to filter the data based on search term
    const filterData = (term) => {
        const filtered = imageData.filter((item) =>
            item.title.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredData(filtered);
    }

    return (
        <>
            <ToastContainer />
            <div className='single_album_container'>

                {openForm &&
                    <div className={styles.alubmForm}>
                        <span>{isEditing ? 'Update' : 'Add'} image to {singleData.name}</span>
                        <form onSubmit={singelImageHandler}>
                            <input required name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                            <input required name='imageUrl' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
                            <div className={styles.imageForm_actions}>
                                <button type="button" onClick={clearData}>Clear</button>
                                <button type='submit'>{isEditing ? 'Update' : 'Add'}</button>
                            </div>
                        </form>
                    </div>
                }
                <div className={styles.album_list_top}>
                    <span onClick={() => setShowList(false)}><img src={backImg} /></span>
                    {imageData.length > 0 ? (<h3>Image in {singleData.name}</h3>) : (<h3>No images found in the album.</h3>)}
                    <div className={styles.imageList_search}>
                        {searchOpen ? (
                            <>
                                <input placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                                <img src={Clear} alt="clear" onClick={() => setSearchOpen(false)} />
                            </>
                        ) : (
                            <img src={Search} alt="clear" onClick={openSearch} />
                        )}

                    </div>
                    {!openForm ? (
                        <button class="false" onClick={openImageForm}>Add image</button>
                    ) : (
                        <button class={styles.imageList_active_} onClick={cencilForm}>Cancel</button>
                    )}
                </div>
                <div>
                    {filteredData.length > 0 ? (
                        <ImageList imageData={filteredData} updateImage={updateImage} />
                    ) : (
                        <ImageList imageData={imageData} updateImage={updateImage} />
                    )}
                </div>
            </div>
        </>
    )
}

export default ImageForm