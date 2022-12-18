import classNames from 'classnames/bind'
import { Button, Container, Row } from 'react-bootstrap'
import styles from './UploadTest.module.scss'
import icon_upload from '~/assets/images/icon.png'
import {SideBarUploadTestConnect} from '~/connect'
let cx = classNames.bind(styles)
function SideBarUploadTest({actionUploadTestImg}){
    const handleClick = (e)=>{
        let myinput = document.getElementById("browse-file-test")
        myinput.setAttribute("display","none")
        myinput.click()
    }
    return (
        <section className={cx("SideBar-container")}>
            <title className={cx("title")}>
                <span>UPLOAD IMAGE</span>
            </title>
            <div className={cx("drop-area")}>
                <div className={cx("content")}>
                    <img className={cx("icon")} src={icon_upload}></img>
                    <div className={cx("title-subtitle")}>
                        <span className={cx("title-blue")}>Upload a file</span>
                        <span className={cx("subtitle")}>PNG, JPG,GIF up to 20MB</span>
                    </div>
                    <button className={cx("btn")} onClick={handleClick}>
                        <span>Browse to upload</span>
                    </button>
                    <input type="file" 
                        id="browse-file-test" 
                        multiple 
                        accept=".jpg,.jpeg,.png"
                        // style={{display:"none"}}
                        onChange={async (e)=>{
                        let files = e.target.files
                        for(let index = 0 ; index < files.length;index++){
                            let fileReader = new FileReader()
                            fileReader.readAsDataURL(files[index])
                            fileReader.onload = (e) => {
                                actionUploadTestImg(e.target.result)
                            }
                        }
                    }}></input>
                </div>
            </div>
        </section>
    )
}

function UploadTest(){
    return(
        <div className={cx("container-fluid")} fluid="true">
            {/* <Row> */}
                <div className={cx("main")}></div>
                <div className={cx("SideBar")}>
                    <SideBarUploadTestConnect></SideBarUploadTestConnect>
                </div>
            {/* </Row> */}

        </div>
    )
}
export {SideBarUploadTest}
export default UploadTest