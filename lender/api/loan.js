
const State = require('state.js')

const loanState = {
    ISSUED: 1,
    DENIED: 2,
    WAITING: 3
};




class Loan extends State {
    constructor(obj) {
        super(Loan.getClass(), [obj.issuer, obj.loanID]);
        Object.assign(this, obj);
    }

    getIssuer() {
        this.issuer;
    }

    setIssuer(newIssuer) {
        this.issuer = newIssuer;
    }

    getOwner() {
        return this.owner;
    }
    
    setOwner(newOwner) {
        this.owner = newOwner;
    }

    getCustomer() {
        return this.customerID;
    }

    setCustomer(newCustomer) {
        this.customer = newCustomer;
    }

    setIssued() {
        this.currentState = loanState.ISSUED;
    }

    setDenied() {
        this.currentState = loanState.DENIED;
    }

    setWaiting() {
        this.currentState = loanState.WAITING;
    }

    isIssued() {
        return this.currentState === loanState.ISSUED;
    }

    isDenied() {
        return this.currentState === loanState.DENIED;
    }

    isWaiting() {
        return this.currentState === loanState.WAITING;
    }

    static fromBuffer(buffer) {
        return Loan.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }


    static deserialize(data) {
        return State.deserializeClass(data, Loan);
    }

    static createInstance(issuer, LoanID, CustomerID, LoanName, BeginDate, BeginAmt, NumPayments, faceValue) {
        return new Loan({ issuer, LoanID, CustomerID, LoanName, BeginDate, BeginAmt, NumPayments, faceValue});
    }

    static getClass() {
        return 'org.studentloansnet.loan';
    }

}


module.exports = Loan;










