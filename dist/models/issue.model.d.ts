import { Entity } from '@loopback/repository';
export declare class Issue extends Entity {
    issuer: string;
    LoanID: string;
    CustomerID: string;
    LoanName: string;
    BeginDate: string;
    BeginAmt: string;
    NumPayments: string;
    constructor(data?: Partial<Issue>);
}
