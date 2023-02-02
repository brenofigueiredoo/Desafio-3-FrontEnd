import './App.css';
import { RouterMain } from './routes';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <RouterMain />
    </div>
  );
}

export default App;
