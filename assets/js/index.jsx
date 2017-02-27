  class RenderResult extends React.Component{
  constructor(props){
  super(props);
  this.state = {country:'',
  area:'',
  temp:'',
  description:''};
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
             let temp = weatherData["main"]["temp"];
             this.setState({country:country,area:area,temp:temp,description:description});

         }
       }
     }
     let openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=6c9fe13836ea80b26786107170d71409";
     httpRequest.open('GET',openWeatherURL,true);
     httpRequest.send(null);

   }

  geoFindMe() {
    	jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAMUdt7A6rCRgMzsVp3PHsXKDF_f1iGzdI",this.success)
  .fail(function(err) {
    alert("API Geolocation error! \n\n"+err);
  });
  }

  render(){
    let loc = ""+{this.state.country}+" , "+{this.state.area};
    let temp = ""+({this.state.temp} - 273.15) + "*C";
  return(
  <div>
  <p><button onClick={this.geoFindMe}>
  Get Weather Info
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

  ReactDOM.render(<RenderResult/>,document.getElementById('out'));
