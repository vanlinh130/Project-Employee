import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})

export class EmployeeDetailComponent implements OnInit {

  // Khai báo các trường dữ liệu để hiển thị lên form
  employee!: Employee;
  url = 'http://localhost:3030/v1/api/accounts';
  id: string;

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
      this.id = route.snapshot.params['id'];
    }

  // Khởi tạo thuộc tính employee lấy về từ phía server
  ngOnInit() {
    this.rest.getOne(this.url, this.id).then(data => {
      this.employee = (data as {employee : Employee}).employee;
    })
  }

  delete(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected employees?',
      header: 'Confirm',
      icon: 'pi pi-trash',
      accept: () => {
        this.rest.delete(this.url, id).then(data => {
          this.showSuccess()
          this.ngOnInit();
          this.router.navigate(['./employee-list'])
        })
      }
    });
  }

  showSuccess() {
    this.messageService.add({
      severity:'success',
      summary: 'Success',
      detail: 'Delete employee successfully'});
  }

}
