import {Component, OnInit} from '@angular/core';
import {Customer} from './customer';
import {CustomerService} from './customer.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'event-management-fe';
  public customers: Customer[] = [];
  public editCustomer: Customer;
  public deleteCustomer?: Customer;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  public getCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (response: Customer[]) => {
        this.customers = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onAddCustomer(addForm: NgForm): void {
    const formElement = document.getElementById('add-employee-form');
    if (formElement) {
      formElement.click();
    }

    this.customerService.addCustomer(addForm.value).subscribe({
      next: (response: Customer) => {
        console.log(response);
        this.getCustomers();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onUpdateCustomer(customer: Customer): void {
    this.customerService.updateCustomer(customer).subscribe({
      next: (response: Customer) => {
        console.log(response);
        this.getCustomers();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getCustomers();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchCustomers(key: string): void {
    const results: Customer[] = [];
    for (const customer of this.customers) {
      if (customer.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || (customer.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1)) {
        results.push(customer);
      }
    }
    this.customers = results;
    if (results.length === 0 || !key) {
      this.getCustomers();
    }
  }

  public onOpenModal(customer: Customer, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editCustomer = customer;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteCustomer = customer;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }

}
