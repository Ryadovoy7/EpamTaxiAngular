var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Order } from '../order';
let OrdersComponent = class OrdersComponent {
    constructor(dataService, authService) {
        this.dataService = dataService;
        this.authService = authService;
        this.order = new Order();
        this.tableMode = true;
        this.editMode = false;
        this.costCalculated = false;
        this.errorMessage = '';
        this.showError = false;
        this.status = ["Новый", "Подтвержден", "Завершен", "Отменен"];
    }
    ngOnInit() {
        this.loadOrders();
    }
    loadOrders() {
        this.dataService.getOrders()
            .subscribe((data) => this.orders = data);
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            this.showError = false;
            if (this.order.orderId == null) {
                yield this.dataService.createOrder(this.order)
                    .toPromise().then((data) => this.orders.push(data))
                    .catch((error) => {
                    this.errorMessage = error;
                    this.showError = true;
                });
            }
            else {
                yield this.dataService.updateOrder(this.order)
                    .toPromise().then(data => this.loadOrders())
                    .catch((error) => {
                    this.errorMessage = error;
                    this.showError = true;
                });
            }
            if (!this.showError) {
                this.cancel();
            }
        });
    }
    editOrder(o) {
        this.order = o;
        this.addOrEdit(false);
    }
    cancelOrder(o) {
        this.dataService.cancelOrder(o.orderId)
            .subscribe(data => this.loadOrders());
    }
    confirmOrder(o) {
        this.dataService.confirmOrder(o.orderId)
            .subscribe(data => this.loadOrders());
    }
    cancel() {
        this.order = new Order();
        this.tableMode = true;
        this.costCalculated = false;
        this.showError = false;
        this.loadOrders();
    }
    delete(o) {
        this.dataService.deleteOrder(o.orderId)
            .subscribe(data => this.loadOrders());
    }
    addOrEdit(add) {
        if (add)
            this.cancel();
        this.tableMode = false;
    }
    calculate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.showError = false;
            yield this.dataService.calculateCost(this.order).toPromise()
                .then(data => this.order.cost = data)
                .catch((error) => {
                this.errorMessage = error;
                this.showError = true;
            });
            if (!this.showError)
                this.costCalculated = true;
        });
    }
    formatCost(val) {
        val.toFixed(2);
    }
};
OrdersComponent = __decorate([
    Component({
        selector: 'app-orders',
        templateUrl: './orders.component.html',
        styleUrls: ['./orders.component.css'],
        providers: [DataService]
    })
], OrdersComponent);
export { OrdersComponent };
//# sourceMappingURL=orders.component.js.map