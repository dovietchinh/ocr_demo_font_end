import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import styles from './ToastMessage.module.scss'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)
function ToastMessage({toastText,actionSetToastMode}){
    useEffect(()=>{
        const interval = setTimeout(()=>{
            actionSetToastMode({toastText:"",toastMode:false})
        },5000)
        console.log('fetch')
    },[])
    return(
        <ToastContainer className={"p-3 "+cx("toast-container")} position="left-start">
                <Toast bg="primary" >
                    <Toast.Header closeButton={false}>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">NOTIFICATION</strong>
                    <small className={cx("X")}>X</small>
                    </Toast.Header>
                    <Toast.Body className={cx("toast-text")}>{toastText}</Toast.Body>
                </Toast>
        </ToastContainer>
    )
}

export default ToastMessage