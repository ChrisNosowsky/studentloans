export class LoanApplication {
    personalData: PersonalData
    loanData: LoanData
    requestType: any = ''
    text: string = ''
}

export class PersonalData {
    email: string = 'example@msu.edu'
    mobile: string = ''
    apid: string = ''
    license: string = ''
}

export class LoanData {
    loanAmt: number
    loanID: string = ''
    issuer: string = ''
    loanName: string = ''
    beginDate: string = ''
    startAmt: number
    balance: number
    dueDate: string = ''
    transferType: string = ''
    delinquent: string = 'no'
    paidOff: string = 'no'

}