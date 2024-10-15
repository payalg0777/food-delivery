export class PaymentEvent {
  constructor(
    public orderId: number,
    public status: 'success' | 'failed',
  ) {}
}
