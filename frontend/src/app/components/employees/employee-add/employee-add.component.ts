import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  employee: Employee;
  addForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  url = 'http://localhost:3030/v1/api/accounts';

  @ViewChild('loginForm')
  male = ['Gender']

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.employee = new Employee();
  }

  ngOnInit() {
    this.employee.gender = 'Male';
  }

  validate() {
    return true;
  }

  onSubmit() {
    if (!this.addForm.valid) {
      console.log('Invalid data');
      return;
    }
    this.save();
    console.log(this.addForm.value);
  }

  save() {
    // Kiểm tra kiểu dữ liệu có hợp lệ hay không
    if (this.validate()) {
      this.rest.post(this.url, this.employee).then(data => {
        this.showSuccess();
        this.router.navigate(['./employee-list'])
      })
        .catch(_error => {
          this.nextPage()
          this.showError()
        })
    }
  }

  nextPage() {
    if (this.employee.name && this.employee.phone &&
        this.employee.enrollDate && this.employee.work &&
        this.employee.email && this.employee.password &&
        this.employee.gender && this.employee.status &&
        this.employee.role) {
      return;
    }
    this.submitted = true;
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Add',
      detail: 'Add employee successfully'
    });
  }

  showError() {
    this.messageService.add({
      severity:'error',
      summary: 'Add',
      detail: 'Add employee failed !!'
    });
  }
}
