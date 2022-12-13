import { connect } from "react-redux";
import {mode,training,testing} from '~/myredux'
import Header from "~/Components/Header";
import UploadUploadSample from "~/Components/UploadSample";
import ShowImage from "~/Components/ShowImage";
import Training from "~/Layout/Training";
import DrawLayout from "~/Components/DrawLayout";
import ProgressBar from "~/Components/ProgressBar";
import UploadTest from "~/Components/UploadTest";



const mapHeaderProp2State = (state)=>{
    return {
        'mode': state.mode.mode
    }
}
const mapHeaderProp2Action = {
    'changeMode': mode.actions.switchMode
}

const mapUploadProp2State = (state)=>{
    return {
        'uploadSamples': state.training.uploadSamples
    }
}
const mapUploadProp2Action = {
    'setUploadSamples': training.actions.actionUploadSamples
}

const mapShowImageProp2State = (state)=>{
    return {
        'uploadSamples': state.training.uploadSamples,
        'modeDraw': state.training.modeDraw,
    }
}
const mapShowImageProp2Action = {
    'setUploadSamples': training.actions.actionUploadSamples,
    'setModeDraw': training.actions.actionSwitchModeDraw
}
const mapTrainingProp2State = (state)=>{
    return {
        'uploadSamples': state.training.uploadSamples,
        'modeDraw': state.training.modeDraw
    }
}
const mapDrawLayoutProp2State = (state) =>{
    return {

    }
}
const mapDrawLayoutProp2Action = {
    
}

export const HeaderConnect = connect(mapHeaderProp2State,mapHeaderProp2Action)(Header)
export const UploadSampleConnect = connect(mapUploadProp2State,mapUploadProp2Action)(UploadUploadSample)
export const ShowImageConnect = connect(mapShowImageProp2State,mapShowImageProp2Action)(ShowImage)
export const TrainingConnect = connect(mapTrainingProp2State,null)(Training)
export const DrawLayoutConnect = connect(mapTrainingProp2State,null)(DrawLayout)
export const ProgressBarConnect = connect(null,null)(ProgressBar)
export const UploadTestConnect = connect(null,null)(UploadTest)
