import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Order } from '../order';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    providers: [DataService]
})
export class OrdersComponent implements OnInit {

    order: Order = new Order();   // изменяемый товар
    orders: Order[];                // массив товаров
    tableMode: boolean = true;          // табличный режим

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadOrders();    // загрузка данных при старте компонента  
    }
    // получаем данные через сервис
    loadOrders() {
        this.dataService.getOrders()
            .subscribe((data: Order[]) => this.orders = data);
    }
    // сохранение данных
    save() {
        if (this.order.orderId == null) {
            this.dataService.createOrder(this.order)
                .subscribe((data: Order) => this.orders.push(data));
        } else {
            this.dataService.updateOrder(this.order)
                .subscribe(data => this.loadOrders());
        }
        this.cancel();
    }
    editOrder(p: Order) {
        this.order = p;
    }
    cancel() {
        this.order = new Order();
        this.tableMode = true;
    }
    delete(p: Order) {
        this.dataService.deleteOrder(p.orderId)
            .subscribe(data => this.loadOrders());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
}