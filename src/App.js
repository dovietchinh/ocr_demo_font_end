import {HeaderConnect,TrainingConnect,TestingConnect,ProgressBarConnect, UploadTestConnect, ToastMessageConnect,LoadingConnect} from '~/connect';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ToastMessage from './Components/ToastMessage';
import Loading from './Components/Loading';
import Login from '~/Components/Login'
import { useSelector } from 'react-redux';
function App() {
  const modeLoginSuccess = useSelector(state=>state.mode.modeLoginSuccess)
  console.log('modeLoginSuccess: ',modeLoginSuccess)
  
  if(modeLoginSuccess){
    return (
      <Router>
      <Routes>
        {
          ['/Training','/'].map((path_router)=>{
            return(
          <Route path={path_router} element={
            <>
            <HeaderConnect></HeaderConnect>
            <ToastMessageConnect/>
            <Loading></Loading>
            <TrainingConnect/>
            </>
            }/>
          )})
        }
        
        <Route extract path='/Testing' element={
                <>
                <HeaderConnect></HeaderConnect>
                <ToastMessageConnect/>
                <Loading></Loading>
                <TestingConnect/>
                </>
                }>
        </Route>
      </Routes>
      </Router>
    )
  }
  else{
    return (
      <Login></Login>
    )
  }
}

export default App;