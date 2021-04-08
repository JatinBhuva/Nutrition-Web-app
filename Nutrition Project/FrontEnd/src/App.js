import './App.css';
import Food  from './Food';

function App() {
  return (
    <div className="App">

      <header className="App-header" style={{cursor:"pointer",padding:"8px"}}>
        <h1>Nutrition Web Project</h1>
      </header>
       
       <Food></Food>
    </div>
    
);
}

export default App;
