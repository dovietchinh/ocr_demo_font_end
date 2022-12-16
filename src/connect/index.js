import { connect } from "react-redux";
import {mode,training,testing} from '~/myredux'
import Header from "~/Components/Header";
import UploadUploadSample from "~/Components/UploadSample";
import ShowImage from "~/Components/ShowImage";
import Training from "~/Layout/Training";
import Testing from "~/Layout/Testing";
import DrawLayout from "~/Components/DrawLayout";
import ProgressBar from "~/Components/ProgressBar";
import UploadTest from "~/Components/UploadTest";
import ShowResult,{SideBarShowResult,MainShowResult} from "~/Components/ShowResult"
import {SideBarUploadTest} from "~/Components/UploadTest"
import ToastMessage from "~/Components/ToastMessage";
const mapHeaderProp2State = (state)=>{
    return {
        'mode': state.mode.mode,
        'customer_ID' : state.mode.customer_ID
    }
}
const mapHeaderProp2Action = {
    'switchMode': mode.actions.switchMode,
    'clearMode': mode.actions.actionClearMode,
    'clearTraining': training.actions.actionClearTraining,
    'clearTesting': testing.actions.actionClearTesting,
    'setCustomerID' : mode.actions.actionSetCustomerID,
    // 'fetchStatus': mode.actions.fetchStatus
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
        'progressBar': state.training.progressBar,
        'customer_ID': state.mode.customer_ID,
        'stateDraw' : state.training.stateDraw
    }
}
const mapShowImageProp2Action = {
    'setUploadSamples': training.actions.actionUploadSamples,
    'setModeDraw': training.actions.actionSwitchModeDraw,
    'setProgressBar': training.actions.actionSetProgressBar
}
const mapTrainingProp2State = (state)=>{
    return {
        'uploadSamples': state.training.uploadSamples,
        'modeDraw': state.training.modeDraw,
        'progressBar': state.training.progressBar
    }
}
const mapDrawLayoutProp2State = (state) =>{
    let listRect ,stateDraw
    if(typeof( state.training.stateDraw)=='object'){
        listRect = state.training.stateDraw.listRect
        stateDraw = state.training.stateDraw
    }
    else{
        listRect = []
        stateDraw = {
            ...state.training.stateDraw,
            listRect: []
        }
    }
    return {
        'stateDraw': stateDraw,
        'listRect': listRect
    }
}
const mapDrawLayoutProp2Action = {
    'setStateDraw':training.actions.actionSetStateDraw
}
const mapSideBarShowResultProp2State = (state)=>{
    return {
        'uploadTestImages':state.testing.uploadTestImages,
        'activeImage': state.testing.activeImage,
        'customer_ID': state.mode.customer_ID
    }
}
const mapSideBarShowResultProp2Action = {
    'actionSetActiveImage': testing.actions.actionSetActiveImage,
    'actionUploadTestImg': testing.actions.actionUploadTestImg,
    'actionSetResultImages': testing.actions.actionSetResultImages
}

const mapSideBarUploadTestProp2State = (state)=>{
    return{

    }
}
const mapSideBarUploadTestProp2Action = {
    'actionUploadTestImg': testing.actions.actionUploadTestImg
}

const mapTestingProp2State = (state)=>{
    return{
        'uploadTestImages': state.testing.uploadTestImages
    }
}
const mapTestingProp2Action = {
    // 'actionUploadTestImg': testing.actions.actionUploadTestImg
}

const mapMainShowResultProp2State = (state)=>{
    return{
        'uploadTestImages': state.testing.uploadTestImages,
        'activeImage':state.testing.activeImage,
        'resultImages':state.testing.resultImages,
        'viewIndex':state.testing.viewIndex,
        // '':resultImages[activeImage]
    }
}
const mapMainShowResultProp2Action = {
    'actionSetViewIndex': testing.actions.actionSetViewIndex
}

const mapProgressBarProp2State = (state)=>{
    return{
        'customer_ID': state.mode.customer_ID,
        'currentPercent':
        {
            'genPercent': state.training.genPercent,
            'trainingPercent': state.training.trainingPercent,
        }
    }
}
const mapProgressBarProp2Action = {
    'switchMode': mode.actions.switchMode,
    'actionSetCurrentPercent': training.actions.actionSetCurrentPercent,
}

const mapToastMessageProp2State = (state) => {
    return{
        'toastText':state.mode.toastText,
        'toastMode': state.mode.toastMode,
    }
}
export const HeaderConnect = connect(mapHeaderProp2State,mapHeaderProp2Action)(Header)
export const UploadSampleConnect = connect(mapUploadProp2State,mapUploadProp2Action)(UploadUploadSample)
export const ShowImageConnect = connect(mapShowImageProp2State,mapShowImageProp2Action)(ShowImage)
export const TrainingConnect = connect(mapTrainingProp2State,null)(Training)
export const DrawLayoutConnect = connect(mapDrawLayoutProp2State,mapDrawLayoutProp2Action)(DrawLayout)
export const ProgressBarConnect = connect(mapProgressBarProp2State,mapProgressBarProp2Action)(ProgressBar)
export const UploadTestConnect = connect(null,null)(UploadTest)
export const SideBarShowResultConnect = connect(mapSideBarShowResultProp2State,mapSideBarShowResultProp2Action)(SideBarShowResult)
export const SideBarUploadTestConnect = connect(mapSideBarUploadTestProp2State,mapSideBarUploadTestProp2Action)(SideBarUploadTest)
export const TestingConnect = connect(mapTestingProp2State,mapTestingProp2Action)(Testing)
export const MainShowResultConnect = connect(mapMainShowResultProp2State,mapMainShowResultProp2Action)(MainShowResult)
export const ShowResultConnect = connect(null,null)(ShowResult)
export const ToastMessageConnect = connect(mapToastMessageProp2State,null)(ToastMessage)