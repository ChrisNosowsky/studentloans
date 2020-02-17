const {Contract, Context} = require('fabric-contract-api');

const Loan = require('./loan.js');
const LoanList = require('./loanlist.js');


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

    async issue(ctx, issuer, LoanID, CustomerID, LoanName, BeginDate, BeginAmt, NumPayments) {
        let loan = Loan.createInstance(issuer, LoanID, CustomerID, LoanName, BeginDate, BeginAmt, NumPayments);
        loan.setIssued();
        loan.setOwner(issuer);
        loan.setCustomer(CustomerID);

        await ctx.loanList.addLoan(loan);

        return loan;
    }
    // /**
    //  * Redeem commercial paper
    //  *
    //  * @param {Context} ctx the transaction context
    //  * @param {String} issuer commercial paper issuer
    //  * @param {Integer} paperNumber paper number for this issuer
    //  * @param {String} redeemingOwner redeeming owner of paper
    //  * @param {String} redeemDateTime time paper was redeemed
    // */
    // async redeem(ctx, issuer, paperNumber, redeemingOwner, redeemDateTime) {

    //     let paperKey = CommercialPaper.makeKey([issuer, paperNumber]);

    //     let paper = await ctx.paperList.getPaper(paperKey);

    //     // Check paper is not REDEEMED
    //     if (paper.isRedeemed()) {
    //         throw new Error('Paper ' + issuer + paperNumber + ' already redeemed');
    //     }

    //     // Verify that the redeemer owns the commercial paper before redeeming it
    //     if (paper.getOwner() === redeemingOwner) {
    //         paper.setOwner(paper.getIssuer());
    //         paper.setRedeemed();
    //     } else {
    //         throw new Error('Redeeming owner does not own paper' + issuer + paperNumber);
    //     }

    //     await ctx.paperList.updatePaper(paper);
    //     return paper;
    // }

}


module.exports = LoanContract;