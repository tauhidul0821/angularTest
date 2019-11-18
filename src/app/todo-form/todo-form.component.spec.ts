import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { FormBuilder } from '@angular/forms';

describe('TodoFormComponent', () => {

  var component: TodoFormComponent;
  beforeEach(()=>{
    component = new TodoFormComponent(new FormBuilder());
  });

  it('should create a form with 2 controls',()=>{
    const result = component.form.contains('name');
    expect(result).toBeTruthy();
  });

  it('should make the name control required',()=>{
    let control = component.form.get('name');
    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  
});
