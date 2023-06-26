import {Component, OnInit} from '@angular/core';
import {Employee} from "./models/employee";
import {EmployeeService} from "./services/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Employees-Manager';

  // @ts-ignore
  public employees!: Employee[];
  public editEmployee!: Employee | null;
  public deleteEmployee!: Employee | null;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
        this.getEmployees();
    }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void{
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (erro: HttpErrorResponse) => {
        alert(erro.message);
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void{
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.editEmployee = employee;
    this.employeeService.updateEmployee(this.editEmployee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (erro: HttpErrorResponse) => {
        alert(erro.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void{
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (erro: HttpErrorResponse) => {
        alert(erro.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null, mode?: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }



}
