import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../environments/environment";
import {Customer} from "./customer";


@Injectable({providedIn: 'root'})
export class CustomerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiServerUrl}/api/v1/customers`);
  }

  public addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiServerUrl}/api/v1/customers`, customer);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiServerUrl}/api/v1/customers/update`, customer);
  }

  public deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/customers/${customerId}`);
  }
}
