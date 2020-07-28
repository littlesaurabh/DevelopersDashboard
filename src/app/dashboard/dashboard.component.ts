import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[{ provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}}]
})
export class DashboardComponent implements OnInit {
  name = 'Angular 4';
  date:any;
  hours:any;
  minutes:any;
  seconds:any;
  currentLocale: any;

  isTwelveHrFormat:false;
  test:any;
  Name
  data
  stock
  stockl
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  location:any={
    "latitude":"",
    "longitude":"",

  };
  Corona:any={
    totalconfirmed: "",
totaldeceased: "",
totalrecovered:""
  }
  news
  today
  weather
  newsSpinner=false;
  constructor(private _formBuilder: FormBuilder, private http:HttpClient){
   //   let now = moment(); // add this 2 of 4
     //navigator.language || navigator.userLanguage; 

 //var test = moment('2016-01-24 14:23:45');

       //ja-JP;
 //de-DE
    setInterval(() =>{
   const currentDate = new Date();
   this.date = currentDate.toLocaleTimeString();
    }, 1000);
  }
  ngOnInit(): void {
  navigator.geolocation.getCurrentPosition(resp => {
      this.location.latitude= resp.coords.latitude
      this.location.longitude=resp.coords.longitude
      // console.log(resp.coords.longitude, resp.coords.latitude)
    },
    err => {
     console.log(err)
    });
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

this.today = mm + '/' + dd + '/' + yyyy;
    if (navigator.appVersion.indexOf("Win") != -1) this.Name =  
    "Windows OS"; 
  if (navigator.appVersion.indexOf("Mac") != -1) this.Name =  
    "MacOS"; 
  if (navigator.appVersion.indexOf("X11") != -1) this.Name =  
    "UNIX OS"; 
  if (navigator.appVersion.indexOf("Linux") != -1) this.Name =  
    "Linux OS"; 
    // console.log(this.Name)


    this.http.get("https://api.covid19india.org/data.json").subscribe(
      (success)=>{
        // console.log(success)
        this.data=success
        var len=this.data.cases_time_series.length
        // console.log(this.data.cases_time_series[len-1])
        this.Corona.totalconfirmed=this.data.cases_time_series[len-1].totalconfirmed
        this.Corona.totalrecovered=this.data.cases_time_series[len-1].totalrecovered
        this.Corona.totaldeceased=this.data.cases_time_series[len-1].totaldeceased

    
      },
    (err)=>{err.message}
    )
   
    this.newsSpinner=false
    this.http.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=7700242c24534d0092ff0bf9256cdc38"+this.location.latitude+"&lng="+this.location.longitude).subscribe(
      (success)=>{
        // console.log(success)
        this.news=success
        this.news=this.news.articles
        // console.log(this.news)
        this.newsSpinner=true
    
      },
    (err)=>{err.message}
    )
    this.http.get("http://dataservice.accuweather.com/currentconditions/v1/191048?apikey=CyRsOnZ1JU95CezmU3C5DdwvFEn79UlQ").subscribe(
      (success)=>{
        console.log(success)
        this.weather=success
        // this.weather=this.news.articles
        // console.log(this.news)
        // this.newsSpinner=true
    
      },
    (err)=>{err.message
    console.log(err)}
    )
    this.http.get("http://localhost:3001/nse/get_gainers").subscribe(
      (success)=>{
   
        this.stock=success
        this.stock=this.stock.data
        console.log(this.stock)
    
      },
    (err)=>{err.message}
    )
    this.http.get("http://localhost:3001/nse/get_losers").subscribe(
      (success)=>{
   
        this.stockl=success
        this.stockl=this.stockl.data
        console.log(this.stockl)
    
      },
    (err)=>{err.message}
    )
   
  }
  // var el_up = document.e("GFG_UP"); 
  // var el_down = document.e("GFG_DOWN"); 
  // el_up.innerHTML = "Click on the button to get the OS of User's System."; 
  // var Name = "Not known"; 

  // "symbol": "HCLTECH",
  // "series": "EQ",
  // "openPrice": "641.00",
  // "highPrice": "684.80",
  // "lowPrice": "640.90",
  // "ltp": "683.50",
  // "previousPrice": "652.85",
  // "netPrice": "4.69",
  // "tradedQuantity": "1,23,65,729",
  // "turnoverInLakhs": "82,324.84",
  // "lastCorpAnnouncementDate": "23-Jul-2020",
  // "lastCorpAnnouncement": "Interim Dividend - Rs 2 Per Share"
 getLocation(){
  if(this.location.latitude)
  this.http.get("http://localhost:3004/location/"+this.location.latitude+"/"+this.location.longitude).subscribe(
    (success)=>{
      console.log(success)
      this.data=success
   
  
    },
  (err)=>{err.message}
  )
 }
}
