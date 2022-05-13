import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/app-service/department.service';

@Component({
  selector: 'app-add-dept-form',
  templateUrl: './add-dept-form.component.html',
  styleUrls: ['./add-dept-form.component.scss'],
})
export class AddDeptFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _deptService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      deptName: [null, [Validators.required]],
    });
  }

  saveDetails(form: FormGroup) {
    this._deptService.addDeptartment(form.value.deptName);
  }
}
