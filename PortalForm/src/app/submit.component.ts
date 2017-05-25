import { Component } from '@angular/core';
import { Http } from '@angular/http';
@Component({
    templateUrl: './app.component.html'
})
export class SubmitComponent {
  data = {};  
  constructor(private http:Http) {}

  onSubmit() {
      console.log(this.data);
    // this.http.post('http://', JSON.stringify(this.data))
    //     .subscribe(...);
  }
}