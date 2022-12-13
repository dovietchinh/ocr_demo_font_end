import classNames from 'classnames/bind'
import { Button, Container, Row } from 'react-bootstrap'
import styles from './UploadTest.module.scss'
import icon_upload from '~/assets/images/icon.png'
let cx = classNames.bind(styles)
function SideBar(){
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
                    {/* <Button variant="primary">Browse to upload</Button> */}
                    <button className={cx("btn")}>
                        <span>Browse to upload</span>
                    </button>
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
                    <SideBar></SideBar>
                </div>
            {/* </Row> */}

        </div>
    )
}
export default UploadTest