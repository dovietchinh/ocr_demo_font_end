import React from 'react'
import {UploadSampleConnect,ShowImageConnect,DrawLayoutConnect, ProgressBarConnect} from '~/connect'
import { mode } from '~/myredux'
function Training({uploadSamples,modeDraw,progressBar}){
    if(progressBar==false){
        if(uploadSamples.length==0){
            return (
                <UploadSampleConnect/>
            )
        }
        else{
            if(modeDraw){
                return (
                    <ShowImageConnect>
                        <DrawLayoutConnect/>
                    </ShowImageConnect>
                )
            }
            else{
                return(
                    <React.Fragment>
                        <ShowImageConnect/>
                    </React.Fragment>
                )
            }
        }
    }
    else{
        return (
            <ProgressBarConnect></ProgressBarConnect>
        )
    }
}

export default Training