import './App.css';
import { Meals, Favorites, Modal, Search } from './components';
import { useGlobalContext } from './context/context';

function App() {
  const { showModal, favorites } = useGlobalContext();

  return (
    <div className="App">
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </div>
  );
}

export default App;
