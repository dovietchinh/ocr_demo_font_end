import { connect } from "react-redux";
import Header from "~/Components/Header";
import Upload from "~/Components/Upload";
import ShowImage from "~/Components/ShowImage";
import Training from "~/Layout/Training";
// import App from "~/App"
import {mode,training,testing} from '~/myredux'

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
        'uploadSamples': state.training.uploadSamples
    }
}
const mapShowImageProp2Action = {
    'setUploadSamples': training.actions.actionUploadSamples
}
const mapTrainingProp2State = (state)=>{
    return {
        'uploadSamples': state.training.uploadSamples
    }
}


export const HeaderConnect = connect(mapHeaderProp2State,mapHeaderProp2Action)(Header)
export const UploadConnect = connect(mapUploadProp2State,mapUploadProp2Action)(Upload)
export const ShowImageConnect = connect(mapShowImageProp2State,mapShowImageProp2Action)(ShowImage)
export const TrainingConnect = connect(mapTrainingProp2State,null)(Training)

