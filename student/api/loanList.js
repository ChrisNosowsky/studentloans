const StateList = require('./statelist.js');

const Loan = require(loan.js);

class LoanList extends StateList {
    constructor(ctx) {
        super(ctx, 'org.studentloansnet.loanlist');
        this.use(Loan);
    }

    async addLoan(loan) {
        return this.addState(loan);
    }

    async getLoan(loanID) {
        return this.getState(loanID);
    }

    async updateLoan(loan) {
        return this.updateState(loan);
    }
}


module.exports = LoanList;