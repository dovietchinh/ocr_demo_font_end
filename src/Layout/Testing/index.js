import React, { useState } from 'react'
import {UploadTestConnect,ShowResultConnect} from '~/connect'
import { mode } from '~/myredux'
function Testing({uploadTestImages}){
    if(uploadTestImages.length==0){
        return (
            <UploadTestConnect/>
        )
    }
    else{
        return(
            <ShowResultConnect></ShowResultConnect>
        )
    }
}

export default Testing