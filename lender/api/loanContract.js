const {Contract, Context} = require('fabric-contract-api');

const Loan = require('./loan.js.js');
const LoanList = require('./loanlist.js.js');


class LoanContext extends Context {
    constructor() {
        super();
        this.loanList = new LoanList(this);
    }
}



class LoanContract extends Contract {
    constructor() {
        super('org.studentloansnet.loan');
    }

    createContext() {
        return new LoanContext();
    }

    async instantiate(ctx) {
        console.log('Instantiate the contract');
    }

    async issue(ctx, issuer, LoanID, CustomerID, LoanName, BeginDate, BeginAmt, NumPayments, faceValue) {
        let loan = Loan.createInstance(issuer, LoanID, CustomerID, LoanName, BeginDate, BeginAmt, NumPayments, faceValue);
        loan.setIssued();
        loan.setOwner(issuer);
        loan.setCustomer(CustomerID);

        await ctx.loanList.addLoan(loan);

        return loan;
    }
}


module.exports = LoanContract;