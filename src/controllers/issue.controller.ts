
import {
    del,
    get,
    getFilterSchemaFor,
    param,
    patch,
    post,
    put,
    requestBody,
  } from '@loopback/rest';
  import {Issue} from '../models';
  
  import { BlockChainModule } from '../blockchainClient';
import { request } from 'http';
  
  let blockchainClient = new BlockChainModule.BlockchainClient();
  
  export class IssueController {
    constructor() {}
  
    @post('/issue', {
      responses: {
        '200': {
          description: 'Todo model instance',
          content: {'application/json': {schema: {'x-ts-type': Issue}}},
        },
      },
    })
    async createIssue(@requestBody() requestBody: Issue): Promise<Issue> {
      console.log('Buy, requestBody: ')
      console.log(requestBody)
  
  
      let networkObj = await blockchainClient.connectToNetwork();
      if (!networkObj) {
        let errString = 'Error connecting to network';
        let issue = new Issue({issuer: errString, LoanID: errString, CustomerID: errString, LoanName: errString, BeginDate: errString, BeginAmt: errString, NumPayments: errString });
        return issue;
      }
      console.log('newtork obj: ')
      console.log(networkObj)
  
      let dataForIssue = {
        function: 'issue',
        issuer: requestBody.issuer,
        LoanID: requestBody.LoanID,
        CustomerID: requestBody.CustomerID,
        LoanName: requestBody.LoanName,
        BeginDate: requestBody.BeginDate,
        BeginAmt: requestBody.BeginAmt,
        NumPayments: requestBody.BeginDate,
        contract: networkObj.contract
      };
  
      var resultAsBuffer = await blockchainClient.issue(dataForIssue);
  
      console.log('result from blockchainClient.submitTransaction in controller: ')
      console.log('result from blockchainClient.submitTransaction in controller: ')
      let result = JSON.parse(Buffer.from(JSON.parse(resultAsBuffer)).toString())
      let issue = new Issue({issuer: result.issuer, LoanID: result.LoanID, CustomerID: result.CustomerID, LoanName: result.LoanName, BeginDate: result.BeginDate,
        BeginAmt: result.BeginAmt, NumPayments: result.NumPayments
      });
      return issue;       
    }
  
  }