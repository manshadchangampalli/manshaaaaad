import React from 'react'
import style from './addProjects.module.css'
import NavBar from '../../../Components/navbar/NavBar'
import { useRef, useState } from 'react'
import Image from 'next/image'
import storage from '../../../Components/firebase/config'
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage"



const AddProjects = () => {
  const [imgUrl, setImgUrl] = useState('/');
  const [loading, setLoading] = useState('no Image');
  const [img,setImg] = useState('')
  const imageUploaded = (e) => {
    setLoading('loading...')
    setImg(e.target.files[0])
    const storageRef = ref(storage, `files/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on("state_changed",
      (snapshot) => {
      },
      (error) => {
        alert(error);
        setLoading('error detected')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          setLoading('')
        });
      }
    );
  }
  const deleteImageFormFirebase = () => {
    const desertRef = ref(storage, `files/${img.name}`);
    deleteObject(desertRef).then(() => {
      setImgUrl('')
      setLoading('no Image')
    }).catch((error) => {
      alert("error")
    });
  }
  const handleSubmit = () => {

  }
  return (
    <div className={style.addProject}>
      <NavBar owner />
      <div style={{ "display": "grid", "gap": "10px" }}>
        <div className={style.container}>
          <div className={style.imageAndPreviewContainer}>
            <div className={style.imgUpload}>
              <input accept="image/*" onChange={imageUploaded} type="file" name="" id="" />
              <h5>Upload Image</h5>
            </div>
            <div className={style.imagePreview}>
              {
                loading==='' && 
                <div onClick={deleteImageFormFirebase} className={style.closeIcon}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L12.3137 12.3137" stroke="black" />
                  <path d="M12.1569 0.843262L0.843152 12.157" stroke="black" />
                </svg>
              </div>}
              <div className={style.imageContainer}>
                <h4>{loading}</h4>
                {
                  imgUrl.length > 3 &&
                  <Image src={imgUrl} objectFit="cover" alt="project image" layout='fill' />
                }
              </div>
            </div>
          </div>
          <div className={style.linkAndNameContainer}>
            <input placeholder='name' type="text" />
            <input placeholder='link' type="text" />
          </div>
          <textarea placeholder='description' className={style.description} name="" id="" cols="30" rows="10"></textarea>
        </div>
        <button>Add Project</button>
      </div>
    </div>
  )
}

export default AddProjects