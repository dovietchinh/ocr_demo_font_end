import React, { useState } from 'react'
import {UploadSampleConnect,ShowImageConnect,DrawLayoutConnect, UploadTestConnect} from '~/connect'
import { mode } from '~/myredux'
function Testing({}){
    const [uploadTestImages,asd] = useState([])

    if(uploadTestImages.length==0){
        return (
            <UploadTestConnect/>
        )
    }
    else{
        return(
            <div>asdasd</div>
        )
    }
}

export default Testing