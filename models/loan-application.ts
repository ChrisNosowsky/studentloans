export class LoanApplication {
    personalData: PersonalData
    requestType: any = ''
    text: string = ''
}

export class PersonalData {
    email: string = ''
    mobile: string = '517 555-5555'
    university: string = 'Michigan State University'
    school_year: string = 'Select'
    student_id: string = 'A1234567'
    mi_resident: string = ''
}