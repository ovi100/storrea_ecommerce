import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Menubar from './components/header/Menubar';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <Menubar />
      <Home />
    </div>
  );
}

export default App;
