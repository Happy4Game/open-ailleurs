import { Link } from "react-router-dom";

function App() {
  return (
    <div className="app">
      {/* ton desktop ici */}
        <Link to="/fake-os">Fake OS</Link>
        <Link to="/complicated-form">Complicated form</Link>

    </div>
  );
}

export default App;
