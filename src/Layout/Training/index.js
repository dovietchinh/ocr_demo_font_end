import {UploadConnect,ShowImageConnect} from '~/connect'
function Training({uploadSamples}){
    if(uploadSamples.length==0){
        return (
            <UploadConnect/>
        )
    }
    else{
        return (
            <ShowImageConnect/>
        )
    }
}
export default Training