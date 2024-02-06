type EmailOrderItemsType = {
  name: string;
  price: number;
  quantity: number;
};
export interface EmailNewOrderType {
  orderLocation: string;
  orderDate: string;
  orderTime: string;
  orderTotal: string;
  orderItems: Array<EmailOrderItemsType>;
}

export interface ChefOrderRequest extends EmailNewOrderType {
  orderApproveUrl: string;
  orderDenyUrl: string;
}