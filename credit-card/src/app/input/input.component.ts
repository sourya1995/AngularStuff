import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() control: FormControl;
  @Input('m') mask: string | boolean = false; 
  constructor() { }

  ngOnInit(): void {
  }

  showMsg() {
    const{dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

  reset(){
    
  }

}
