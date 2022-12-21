import axios from 'axios'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SideBarShowResultConnect,MainShowResultConnect } from '~/connect'
import styles from './ShowResult.module.scss'
import mode from '~/myredux/mode'
import store from '~/myredux'
import { asyncActionInfer } from '~/myredux/testing'
let cx = classNames.bind(styles)
function SideBarSelectModel(){
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
                            console.log('currentTrainingModel: ',currentTrainingModel)
                            let disabled = false
                            if(ele==currentTrainingModel & trainingFlag==true) {
                                text_display += "     (training...)"
                                disabled = true
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
function SideBarShowResult({uploadTestImages,actionUploadTestImg,activeImage,actionSetActiveImage,actionSetResultImages,customer_ID,actionDeleteTestImages,selectedModel}){
    
    const handleClick = (e)=>{
        let myinput = document.getElementById("browse-file-show-test")
        myinput.setAttribute("display","none")
        myinput.click()
    }
    useEffect( ()=>{

        const fetchData = async () => {
            let test_json = {
                customer_ID: selectedModel,
                image_info: [uploadTestImages.at(-1)],
            }
            console.log(test_json.customer_ID)
            const response = await axios.
                                post('http://10.124.64.125:18001/infer',test_json)
                                // get('http://127.0.0.1:9000/api/v1/test_img')
                                .then((r)=>{
                                    console.log(r.data)
                                    let data = r.data.image_result_paths
                                    // data = data.map((x)=>{return "data:image/png;base64,"+x})
                                    // data = data.map((x)=>)
                                    actionSetResultImages(data)
                                })
                                .catch((e)=>{
                                    console.log(e)
                                })
        }
        fetchData()
    },[uploadTestImages])
    return (
        <div className={cx("sidebar-content")}>
            <div className={cx("sidebar__title")}>
                <span className={cx("sidebar__title-upload")}>UPLOAD IMAGE</span>
                <div className={cx("sidebar__title-new")} onClick={handleClick}>
                    <span >New image</span>
                </div>
                <input type="file" 
                        id="browse-file-show-test" 
                        multiple 
                        accept=".jpg,.jpeg,.png"
                        style={{display:"none"}}
                        onChange={(e)=>{
                            let files = e.target.files
                            for(let index = 0 ; index < files.length;index++){
                                let fileReader = new FileReader()
                                fileReader.readAsDataURL(files[index])
                                fileReader.onload = (e) => {
                                    // actionUploadTestImg(e.target.result)
                                    store.dispatch(asyncActionInfer(e.target.result))
                                    
                                }
        
                            }
                            e.target.value = ''
                        }}>

                </input>
            </div>
            <div className={cx("sidebar__image-list")}>
                {
                    uploadTestImages.map((ele,index)=>{
                        let cls = ""
                        if(index==activeImage){
                            cls = "thumbnail--active"
                        }
                        return(
                            <div key={index} 
                                onClick={(e)=>{
                                    actionSetActiveImage(index)
                                }}
                                className={cx("sidebar__default-thumbnail",cls)}
                                onKeyDown={(e)=>{
                                    if(e.key=='Delete'){
                                        actionDeleteTestImages(activeImage)
                                    }
                                }}
                                tabIndex="-1"
                                > 
                                <img src={ele}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
function MainShowResult({activeImage,resultImages,viewIndex,actionSetViewIndex}){
    let check = useRef(false)
    const [imageViews,setImageView] = useState([])
    useEffect(()=>{
        
        if(resultImages[activeImage]==null & typeof(resultImages[activeImage])=='undefined'){
            check.current = false
            setImageView([])
        }
        else{
            check.current = true
            setImageView(resultImages[activeImage])
        }
    },[activeImage,resultImages])
    return (
        <div className={cx("main-section")}>
            <div className={cx("main__title")}>
                <span>PREVIEW</span>
            </div>
            <div className={cx("main__container")}>
                <div className={cx("display")}>
                {
                    imageViews.map((ele,index)=>{
                        let cls = ""
                        if(viewIndex)
                        {
                            if(index==viewIndex){
                                cls = "image-view--action"
                        }}
                        return (
                            <div key={index} className={cx("image-view",cls)}
                                onClick={(e)=>{
                                    actionSetViewIndex(index)
                                }}
                                >
                                <img src={ele} style={{
                                    width:"100%",
                                    height:"100%",
                                    objectFit: "contain"
                                    }}></img>
                            </div>
                        )
                    })
                }
                {/* {draw()} */}
                </div>
            </div>
        </div>
    )

}
function ShowResult(){
    return (
        <div className={cx("container-fluid")}>
            <div className={cx("main")}>
                <MainShowResultConnect></MainShowResultConnect>
            </div>
            <div className={cx("sidebar")}>
                <SideBarSelectModel/>
                <SideBarShowResultConnect/>
            </div>
        </div>

    )

}
export {SideBarShowResult,MainShowResult}
export default ShowResult