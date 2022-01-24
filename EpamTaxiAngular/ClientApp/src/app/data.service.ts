import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Order } from './order'

@Injectable()
export class DataService {
    private url = "api/orders";
    private _baseUrl = "";

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    getOrders() {
        return this.http.get(this._baseUrl + this.url);
    }

    getOrder(id: number) {
        return this.http.get(this._baseUrl + this.url + '/' + id);
    }

    createOrder(order: Order) {
        order.orderDate = new Date(Date.now());
        return this.http.post(this._baseUrl + this.url, order);
    }
    updateOrder(order: Order)  {
        return this.http.put(this._baseUrl + this.url, order);
    }
    deleteOrder(id: number) {
        return this.http.delete(this._baseUrl + this.url + '/' + id);
    }
    calculateCost(order: Order) {
        return this.http.post(this._baseUrl + this.url + '/calculate', order);
    }
    cancelOrder(id: number) {
        return this.http.get(this._baseUrl + this.url + '/cancel/' + id);
    }
    confirmOrder(id: number) {
        return this.http.get(this._baseUrl + this.url + '/confirm/' + id);
    }
}