import { useEffect, useState } from "react";
import AlbumsList from "./components/albumlist/AlbumList";
import Navbar from "./components/navbar/Navbar";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseInt";
 
function App() {
  const [data ,setData] = useState([]);
  const displayAlbum =  () =>{
    try{
      const listRef = onSnapshot(collection(db,'albums'),(snapShot)=>{
        const album = snapShot.docs.map((doc) =>{
          return{
            id:doc.id,
            ...doc.data()
          }
        })
        setData(album)
       })
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    displayAlbum();
  },[])
  return (
    <>
   
     <Navbar/>
    <AlbumsList  AlbumData={data}/>
    </>
  );
}

export default App;
