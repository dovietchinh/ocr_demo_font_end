import React from 'react'
import {UploadSampleConnect,ShowImageConnect,DrawLayoutConnect} from '~/connect'
import { mode } from '~/myredux'
function Training({uploadSamples,modeDraw}){

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

export default Training