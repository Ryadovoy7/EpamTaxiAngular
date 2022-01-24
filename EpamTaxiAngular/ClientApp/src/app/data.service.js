var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from '@angular/core';
let DataService = class DataService {
    constructor(http, baseUrl) {
        this.http = http;
        this.url = "api/orders";
        this._baseUrl = "";
        this._baseUrl = baseUrl;
    }
    getOrders() {
        return this.http.get(this._baseUrl + this.url);
    }
    getOrder(id) {
        return this.http.get(this._baseUrl + this.url + '/' + id);
    }
    createOrder(order) {
        order.orderDate = new Date(Date.now());
        return this.http.post(this._baseUrl + this.url, order);
    }
    updateOrder(order) {
        return this.http.put(this._baseUrl + this.url, order);
    }
    deleteOrder(id) {
        return this.http.delete(this._baseUrl + this.url + '/' + id);
    }
    calculateCost(order) {
        return this.http.post(this._baseUrl + this.url + '/calculate', order);
    }
    cancelOrder(id) {
        return this.http.get(this._baseUrl + this.url + '/cancel/' + id);
    }
    confirmOrder(id) {
        return this.http.get(this._baseUrl + this.url + '/confirm/' + id);
    }
};
DataService = __decorate([
    Injectable(),
    __param(1, Inject('BASE_URL'))
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map