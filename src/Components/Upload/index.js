import classNames from 'classnames/bind';
import styles from "./Upload.module.scss"
// import upload_icon from "~/assets/images/upload_icon.svg"
import {Button, Col,Container,Row} from 'react-bootstrap'
import React from 'react';
import icon_upload from '~/assets/images/icon.png'
import {useState} from 'react'
let cx = classNames.bind(styles)
function Upload({uploadSamples,setUploadSamples}){
    const [text,setText] = useState("");
    const handleClick = (e)=>{
        let myinput = document.getElementById("browse-file")
        myinput.setAttribute("display","none")
        myinput.click()
    }
    return (
        <Col xl={6} className={cx("container")+" mt-5"}>
            <title className={cx("title")}>
                <span>UPLOAD IMAGE</span>
            </title>
            <div className={cx("drop-area")}>
                <div className={cx("content")}>
                    <img src={icon_upload}></img>
                    <div className={cx("text-upload")}>
                        <span className={cx("text-upload-title")}>Upload a file</span>
                        <span className={cx("text-upload-subtitle")}>PNG, JPG up to 20MB</span>
                    </div>
                    <Button variant='primary'  
                            className={cx("btn")+" btn"}
                            onClick={handleClick}
                            >
                    Browse a file</Button>
                    <span className={cx("file-name")}>{
                        text
                    }</span>
                    <input type="file" 
                        id="browse-file" 
                        multiple 
                        accept=".jpg,.jpeg,.png"
                        onChange={async (e)=>{
                        // setText(e.target.files[0].name);
                        let files = e.target.files

                        for(let index = 0 ; index < files.length;index++){
                            let fileReader = new FileReader()
                            fileReader.readAsDataURL(files[index])
                            fileReader.onload = (e) => {
                                setUploadSamples(e.target.result)
                            }
      
                        }

                    }}></input>
                </div>
                
            </div>
        </Col>
    )

}
export default Upload