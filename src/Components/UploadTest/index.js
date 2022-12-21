import classNames from 'classnames/bind'
import { Button, Container, Row } from 'react-bootstrap'
import styles from './UploadTest.module.scss'
import icon_upload from '~/assets/images/icon.png'
import {SideBarUploadTestConnect} from '~/connect'
import { useDispatch, useSelector } from 'react-redux'
import mode from '~/myredux/mode'
import axios from 'axios'
import { useEffect } from 'react'
let cx = classNames.bind(styles)
function SideBarSelectModel2(){
    let models = useSelector(state=>state.mode.models)
    console.log('models: ',models)
    let selectedModel = useSelector(state=>state.mode.selectedModel)
    let customer_ID = useSelector(state=>state.mode.customer_ID)
    let currentTrainingModel = useSelector(state=>state.training.currentTrainingModel)
    let trainingFlag = useSelector(state=>state.training.trainingFlag)
    console.log('selectedModel: ',selectedModel)
    const dispatch = useDispatch ()
    useEffect(()=>{
        let fetchData = async()=>{
            await axios.post('http://10.124.64.125:18001/api/v1/get_models_user',{customer_ID})
                .then((r)=>{
                    dispatch(mode.actions.actionSetModels(r.data.listModels))
                })
                .catch(console.log('error in get models user'))
        }
        fetchData()
    },[])
    return (
        <div className={cx("select")}>
            <small className={cx('label')}>SELECT MODEL</small>
            <div className={cx("select__field")}>
                <select className={cx("select__input")} onChange={(e)=>{

                        console.log('value: ',e.target.value)
                        dispatch(mode.actions.actionSetSelectedModel(e.target.value))
                    }}>
                    {/* <option value="audi">Audi</option> */}
                    {
                        models.map((ele,index)=>{
                            let select = ""
                            if(ele==selectedModel) select="selected"
                            let text_display = ele.replaceAll("_"," ").replace(customer_ID,"")
                            let disabled = false
                            if(ele==currentTrainingModel & trainingFlag==true) {
                                text_display += "     (training...)"
                                disabled=true
                            }
                            return(
                                <option ket={index} selected={select}  disabled={disabled} value={ele}>{text_display}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}
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
                    <SideBarSelectModel2/>
                    <SideBarUploadTestConnect></SideBarUploadTestConnect>
                </div>
            {/* </Row> */}

        </div>
    )
}
export {SideBarUploadTest}
export default UploadTest