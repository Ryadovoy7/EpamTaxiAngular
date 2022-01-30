import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Order } from '../order';
import { AuthenticationService } from '../authentication/authentication.service'

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
    providers: [DataService]
})
export class OrdersComponent implements OnInit {

    order: Order = new Order();   
    orders: Order[];               
    tableMode: boolean = true;
    editMode: boolean = false;
    costCalculated: boolean = false;
    errorMessage: string = '';
    showError: boolean = false;

    status: string[] = ["Новый", "Подтвержден", "Завершен", "Отменен"];

    constructor(private dataService: DataService, private authService: AuthenticationService) { }

    ngOnInit() {
        this.loadOrders();   
    }

    loadOrders() {
        this.dataService.getOrders()
            .subscribe((data: Order[]) => this.orders = data);
    }

    async save() {
        this.showError = false;
        if (this.order.orderId == null) {
            await this.dataService.createOrder(this.order)
                .toPromise().then((data: Order) => this.orders.push(data))
                .catch((error) => {
                    this.errorMessage = error;
                    this.showError = true;
                });
        } else {
            await this.dataService.updateOrder(this.order)
                .toPromise().then(data => this.loadOrders())
                .catch(
                    (error) => {
                        this.errorMessage = error;
                        this.showError = true;
                    });
        }
        if (!this.showError) {
            this.cancel();
        }           
    }
    editOrder(o: Order) {
        this.order = o;
        this.addOrEdit(false);
    }
    cancelOrder(o: Order) {
        this.dataService.cancelOrder(o.orderId)
            .subscribe(data => this.loadOrders());
    }
    confirmOrder(o: Order) {
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
    delete(o: Order) {
        this.dataService.deleteOrder(o.orderId)
            .subscribe(data => this.loadOrders());
    }
    addOrEdit(add: boolean) {
        if (add)
            this.cancel();
        this.tableMode = false;
    }
    async calculate() {
        this.showError = false;
        await this.dataService.calculateCost(this.order).toPromise()
            .then(data => this.order.cost = data as number)
            .catch(
                (error) => {
                    this.errorMessage = error;
                    this.showError = true;
                });
        if (!this.showError)
            this.costCalculated = true;
    }
    formatCost(val : number) {
        val.toFixed(2);
    }

}