import './App.scss';
import Navbar from './components/Navbar/Navbar';
import WorkspacePage from './pages/WorkspacePage/WorkspacePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="" element={<WorkspacePage />} />
          <Route path="/workspace/:mapId" element={<WorkspacePage />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
