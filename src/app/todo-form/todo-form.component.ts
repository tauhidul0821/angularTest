import {FormBuilder,FormGroup,Validator, Validators} from '@angular/forms';

export class TodoFormComponent{
  form: FormGroup;

  constructor(fb:FormBuilder){
    this.form=fb.group({
      name:['',Validators.required],
      email:[''],
    });
  }
}