import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Workspace from './components/Workspace/Workspace';

function App() {
  return (
    <div className="app">
      <Navbar/>
      <Workspace/>
    </div>
  );
}

export default App;
