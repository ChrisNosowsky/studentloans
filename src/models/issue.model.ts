import {Entity, model, property} from '@loopback/repository';

@model()
export class Issue extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  issuer: string;

  @property({
    type: 'string',
    required: true,
  })
  LoanID: string;

  @property({
    type: 'string',
    required: true,
  })
  CustomerID: string;

  @property({
    type: 'string',
    required: true,
  })
  LoanName: string;

  @property({
    type: 'string',
  })
  BeginDate: string;

  @property({
    type: 'string',
  })
  BeginAmt: string;

  @property({
    type: 'string',
  })
  NumPayments: string;

  constructor(data?: Partial<Issue>) {
    super(data);
  }
}