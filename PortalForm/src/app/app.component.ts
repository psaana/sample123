import { Component } from '@angular/core';
import { MdInputModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import {MdCardModule} from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users = [];
  user = { fName: '', lName: '', technology: '', location: '' };

  technologies = [
    { value: 'javaScript', viewValue: 'javaScript' },
    { value: '.Net', viewValue: '.Net' },
    { value: 'QA', viewValue: 'QA' },
    { value: 'NodeJs', viewValue: 'NodeJs' }];

  locations = [
    { value: 'Hyderabad', viewValue: 'Hyderabad' },
    { value: 'Bangalore', viewValue: 'Bangalore' },
    { value: 'San Jose', viewValue: 'San Jose' },
    { value: 'Pune', viewValue: 'Pune' }];

  constructor(private http: Http) {
    this.loadAllUsers();
  }

  addNewUser() {
    var vm = this;
    this.registerUser().then(function (response) {
      vm.users = response;
      vm.reset();
    });
  }

  loadAllUsers() {
    let vm = this;
    this.getAllUsers().then(function (response) {
      vm.users = response;
      vm.reset();
    });
  }

  registerUser(): Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8080/api/user', JSON.stringify(this.user), options)
      .toPromise()
      .then(response => { return response.json(); })
      .catch(function (error) {
        console.log(error);
        this.reset();
      });
  }
  reset() {
    this.user = { fName: '', lName: '', technology: '', location: '' };
  }

  findUser(searchTxt: string) {
    let vm = this;
    if (searchTxt) {
      vm.searchUser(searchTxt).then(function (response) {
        vm.users = response;
        vm.reset();
      });
    } else {
      this.loadAllUsers();
    }
  }

  searchUser(searchTxt: string): Promise<any> {

    return this.http.get('http://localhost:8080/api/findUser/' + searchTxt)
      .toPromise()
      .then(response => { return response.json(); })
      .catch(function (error) {
        console.log(error);
        this.reset();
      });


  }

  getAllUsers(): Promise<any> {
    return this.http.get('http://localhost:8080/api/users/')
      .toPromise()
      .then(response => { return response.json(); })
      .catch(function (error) {
        console.log(error);
        this.reset();
      });
  }

}
