import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import API_KEY from './secret';

const app = new Clarifai.App({
  apiKey: API_KEY
})

const particlesOptions = {
  polygon: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (date) => {
    const clarifaiFace = date.outpus[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
  }

  onInputChange = (event) => {    
    this.setState({image: event.target.value})
  }
  
  onSubmit = () => {
    // image example  https://buffer.com/library/content/images/size/w300/2020/05/Frame-9.png 
    this.setState({imageUrl: this.state.input});
    console.log(this.state.input);
 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.calculateFaceLocation(response))
    .catch(error => console.log(error));
    
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
                  params={particlesOptions} />
        <Navigation />
        <Logo/>
        <Rank/>
        <ImageLinkForm  onButtonSubmit={this.onSubmit} onInputChange={this.onInputChange}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
