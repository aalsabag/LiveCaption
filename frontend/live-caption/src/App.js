import logo from './logo.svg';
import './App.css';
import FullForm from './components/FullForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div class="typingEffect">
          <h3>Zoom Live Captioning.</h3>
      </div>
        <FullForm></FullForm>
        <div id="message">
          <font face = "WildWest" size = "5">
            This tool is and always will be a FREE, open-source service designed to serve the needs of those with difficulty hearing.
          </font>
          <br/>
          <br/>
          <font face = "WildWest" size = "5">
            Please forgive any slow processing times likely due to server load
          </font>
          <br/>
          <font face = "WildWest" size = "5">
            <a href="https://github.com/aalsabag/LiveCaption">https://github.com/aalsabag/LiveCaption</a>
          </font>
        </div>
      </header>
    </div>
  );
}

export default App;
