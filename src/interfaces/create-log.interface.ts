export interface createLogInterface {
  action: Action;
  paymentType: string;
  paymentDate: Date;
  category: number;
  amount: number;
  created_at: Date;
}

export enum Action {
  'create' = 'create',
  'update' = 'update',
  'delete' = 'delete',
}
