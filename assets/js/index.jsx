  class RenderResult extends React.Component{
  constructor(props){
  super(props);
  this.state = {country:'',
  area:'',
  temp:0,
  description:'',
  disabled:''
  };
  this.success = this.success.bind(this);
  this.geoFindMe = this.geoFindMe.bind(this);
  }

  success(position) {
       var latitude  = position.location.lat;
       var longitude = position.location.lng;
       let httpRequest;
       if(window.XMLHttpRequest){
         httpRequest = new XMLHttpRequest();
       }
       httpRequest.onreadystatechange = () => {
         if(httpRequest.readyState == XMLHttpRequest.DONE){
           if(httpRequest.status === 200){
             let weatherData = JSON.parse(httpRequest.responseText);
             let country = weatherData["sys"]["country"];
             let area = weatherData["name"];
             let description = weatherData["weather"][0]["description"];
             let temp = parseFloat(weatherData["main"]["temp"]);
             this.setState({country:country,area:area,temp:temp,description:description,disabled:""});

         }
       }
     }
     let openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=6c9fe13836ea80b26786107170d71409";
     httpRequest.open('GET',openWeatherURL,true);
     httpRequest.send(null);

   }

  geoFindMe() {
    this.setState({disabled:"disabled"});
    jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAMUdt7A6rCRgMzsVp3PHsXKDF_f1iGzdI",this.success)
    .fail(function(err) {
    alert("API Geolocation error! \n\n"+err);
  });
  }

  render(){
    let loc = ((this.state.area).length===0)?(<span></span>):(<span>{this.state.country} , {this.state.area}</span>);
    let t = this.state.temp - 273.15;
    let temp = (t===-273.15)? (<span></span>):(<span>{t.toPrecision(4)} &#8451;</span>);
  return(
  <div>
  <p><button onClick={this.geoFindMe} disabled={this.state.disabled} class={btn,btn-light}>
  Get your local weather Information 
  </button></p>
  <ul>
  <li>Location - {loc}</li>
  <li>Weather Description - {this.state.description}</li>
  <li>Temperature - {temp}</li>
  </ul>
  </div>
  );
  }
  }

class Run extends React.Component {
    
    constructor(props) {
        super(props);
        this.imgArray = new Array();
        for(let i=0;i<12;i++){
          this.imgArray[i] = new Image();
          this.imgArray[i].src = '/assets/img/'+(i+1)+'.png';
        }
        this.state = { image: this.imgArray[0].src,pos:12,pad:0 };        
        this.changeImage = this.changeImage.bind(this);
        this.startRunning = this.startRunning.bind(this);
        this.stopRunning = this.stopRunning.bind(this);                
        this.intervalHooks = new Array();
    }

    startRunning() {
      this.intervalHooks.push(setInterval(() => {this.changeImage()},150));      
      //this.setState({interval:intervalHooks});
    }
    
    stopRunning() {
       for (var i=0; i < this.intervalHooks.length; i++) {
        clearInterval(this.intervalHooks[i]);
    }     

      //clearInterval(this.state.interval);
    }

    componentWillUnmount(){
      clearInterval(this.intervalHooks);
    }

    changeImage(){
      let currentPos = this.state.pos; 
      let width = this.reqDiv.offsetWidth-68; 
      let incPad = this.state.pad+25;
      if(incPad>width)
      incPad = width;    
      let newPad = incPad%width;
      this.setState({image:this.imgArray[(currentPos%12)].src,pos:(currentPos+1),pad:newPad});
    }
  
    render() {
        return (
          <div ref={foo => {this.reqDiv = foo}}>
            <div style={{paddingLeft:this.state.pad,height:95}}>
              <img src={this.state.image}></img>              
            </div>
            <button type="button" onClick={this.startRunning} >Make him run! faster n faster..</button>
            <button type="button" onClick={this.stopRunning} >Stop him</button>
            </div>
            );
    }
}


class ColorMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = { colour: this.getRandomColor() };
        this.getRandomColor = this.getRandomColor.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    changeColor() {
        let color = this.getRandomColor();
        this.setState({ colour: color });
    }

    componentDidMount() {
      setInterval(() => {this.changeColor()},
      1000
    );
  }

    render() {
        return (
            <div style={{padding:20,backgroundColor:this.state.colour}} onMouseOver ={this.changeColor}>              
            </div>
            );
    }
}

ReactDOM.render(<Run/>, document.getElementById('runExp'));
ReactDOM.render(<RenderResult/>,document.getElementById('out'));
