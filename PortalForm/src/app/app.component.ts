import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { contact;
  title = 'app works!';
  thanks = 'app works!';
  data = {name : '', age : ''};
  constructor(){}

  onSubmit() {
    console.log("Data", this.data);
  }
  ngOnInit() {this.contact = {name:"", age:""} }
}
