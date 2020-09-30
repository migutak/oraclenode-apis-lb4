import {Entity, model, property} from '@loopback/repository';

@model()
export class Ptps extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  accnumber: string;

  @property({
    type: 'number',
  })
  ptpamount?: number;

  @property({
    type: 'string',
  })
  met?: string;

  @property({
    type: 'string',
  })
  paymentdate?: string;

  @property({
    type: 'number',
    default: 0,
  })
  arramount?: number;

  @property({
    type: 'string',
  })
  ptpdate?: string;

  @property({
    type: 'date',
  })
  promisedate?: string;

  @property({
    type: 'string',
  })
  paymethod?: string;

  @property({
    type: 'date',
  })
  actiondate?: string;

  @property({
    type: 'string',
  })
  owner?: string;

  @property({
    type: 'string',
  })
  ammended?: string;

  @property({
    type: 'string',
  })
  ptpsmsnumber?: string;

  @property({
    type: 'string',
  })
  ptpemailaddress?: string;

  @property({
    type: 'string',
  })
  ptpsms?: string;

  @property({
    type: 'string',
  })
  ptpemail?: string;


  constructor(data?: Partial<Ptps>) {
    super(data);
  }
}

export interface PtpsRelations {
  // describe navigational properties here
}

export type PtpsWithRelations = Ptps & PtpsRelations;
