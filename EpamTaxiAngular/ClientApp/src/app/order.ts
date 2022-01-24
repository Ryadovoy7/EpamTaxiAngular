export class Order {
    constructor(
        public orderId?: number,
        public fullName?: string,
        public contactNumber?: string,
        public orderDate?: Date,
        public carDeliveryTime?: Date,
        public fromLocation?: string,
        public toLocation?: string,
        public cost?: number,
        public status?: number) { }
}