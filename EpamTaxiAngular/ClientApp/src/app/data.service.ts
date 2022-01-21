import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order'

@Injectable()
export class DataService {

    private url = "/api/orders";

    constructor(private http: HttpClient) {
    }

    getOrders() {
        return this.http.get(this.url);
    }

    getOrder(id: number) {
        return this.http.get(this.url + '/' + id);
    }

    createOrder(product: Order) {
        return this.http.post(this.url, product);
    }
    updateOrder(product: Order)  {

        return this.http.put(this.url, product);
    }
    deleteOrder(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}