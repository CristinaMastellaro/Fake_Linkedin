import './App.css';
import SidebarProfilo from './components/SidebarProfilo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SidebarHome from './components/SidebarHome';
function App() {
  return (
    <>
      <SidebarProfilo />
      <SidebarHome />
    </>
  );
}

export default App;
