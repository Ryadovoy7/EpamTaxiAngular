var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Order } from '../order';
let OrdersComponent = class OrdersComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.order = new Order(); // изменяемый товар
        this.tableMode = true; // табличный режим
    }
    ngOnInit() {
        this.loadOrders(); // загрузка данных при старте компонента  
    }
    // получаем данные через сервис
    loadOrders() {
        this.dataService.getOrders()
            .subscribe((data) => this.orders = data);
    }
    // сохранение данных
    save() {
        if (this.order.orderId == null) {
            this.dataService.createOrder(this.order)
                .subscribe((data) => this.orders.push(data));
        }
        else {
            this.dataService.updateOrder(this.order)
                .subscribe(data => this.loadOrders());
        }
        this.cancel();
    }
    editOrder(p) {
        this.order = p;
    }
    cancel() {
        this.order = new Order();
        this.tableMode = true;
    }
    delete(p) {
        this.dataService.deleteOrder(p.orderId)
            .subscribe(data => this.loadOrders());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
};
OrdersComponent = __decorate([
    Component({
        selector: 'app-orders',
        templateUrl: './orders.component.html',
        providers: [DataService]
    })
], OrdersComponent);
export { OrdersComponent };
//# sourceMappingURL=orders.component.js.map