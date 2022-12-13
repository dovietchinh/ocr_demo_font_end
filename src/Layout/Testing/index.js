import React, { useState } from 'react'
import {UploadSampleConnect,ShowImageConnect,DrawLayoutConnect, UploadTestConnect, SideBarShowResultConnect,ShowResultConnect} from '~/connect'
import { mode } from '~/myredux'
function Testing({uploadTestImages}){

    if(uploadTestImages.length==0){
        return (
            <UploadTestConnect/>
        )
    }
    else{
        return(
            // <div>asdasd</div>
            // <SideBarShowResultConnect></SideBarShowResultConnect>
            <ShowResultConnect></ShowResultConnect>
        )
    }
}

export default Testing