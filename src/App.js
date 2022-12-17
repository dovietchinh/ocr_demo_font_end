import {HeaderConnect,TrainingConnect,TestingConnect,ProgressBarConnect, UploadTestConnect, ToastMessageConnect,LoadingConnect} from '~/connect';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ToastMessage from './Components/ToastMessage';
function App() {
  return (
    <Router>
      <HeaderConnect></HeaderConnect>
      <ToastMessageConnect/>
      <LoadingConnect></LoadingConnect>
      <Routes>
      <Route path="/" element={<TrainingConnect/>} />
        <Route path="/Training" element={<TrainingConnect/>} />
        <Route path="/Testing" element={<TestingConnect/>} />
        {/* <Route path="/Testings" element={<ProgressBarConnect/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
