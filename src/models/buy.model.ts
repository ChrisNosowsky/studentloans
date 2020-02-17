// import {Entity, model, property} from '@loopback/repository';

// @model()
// export class Buy extends Entity {
//   @property({
//     type: 'string',
//     required: true,
//   })
//   issuer: string;

//   @property({
//     type: 'string',
//     required: true,
//   })
//   paperNumber: string;

//   @property({
//     type: 'string',
//     required: true,
//   })
//   currentOwner: string;

//   @property({
//     type: 'string',
//     required: true,
//   })
//   newOwner?: string;

//   @property({
//     type: 'string',
//   })
//   price?: string; // address,city,zipcode

//   // TODO(bajtos) Use LoopBack's GeoPoint type here
//   @property({
//     type: 'string',
//   })
//   purchaseDateTime?: string; // latitude,longitude

//   constructor(data?: Partial<Buy>) {
//     super(data);
//   }
// }