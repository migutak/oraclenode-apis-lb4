import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: true,
  },
})
export class Activitylogs extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  accountnumber?: string;

  @property({
    type: 'string',
  })
  custnumber?: string;

  @property({
    type: 'string',
  })
  action?: string;

  @property({
    type: 'string',
  })
  cure?: string;

  @property({
    type: 'string',
  })
  party?: string;

  @property({
    type: 'any',
  })
  promiseamount?: any;

  @property({
    type: 'string',
  })
  promisedate?: string;

  @property({
    type: 'string',
    default: 'N',
  })
  ptp?: string;

  @property({
    type: 'string',
    default: 'N',
  })
  ptpemail?: string;

  @property({
    type: 'any',
  })
  ptpsms?: any;

  @property({
    type: 'string',
  })
  ptpsmsnumber?: string;

  @property({
    type: 'any',
  })
  ptpemailaddress?: any;

  @property({
    type: 'string',
  })
  notemade?: string;

  @property({
    type: 'string',
  })
  reviewdate?: string;

  @property({
    type: 'string',
  })
  reason?: string;

  @property({
    type: 'string',
  })
  reasondetails?: string;

  @property({
    type: 'string',
  })
  cmdstatus?: string;

  @property({
    type: 'string',
  })
  route?: string;

  @property({
    type: 'string',
  })
  paymode?: string;

  @property({
    type: 'string',
  })
  noteimp?: string;

  @property({
    type: 'string',
  })
  notesrc?: string;

  @property({
    type: 'string',
  })
  rfdother?: string;

  @property({
    type: 'string',
  })
  owner?: string;

  @property({
    type: 'number',
    default: 0,
  })
  arramount?: number;

  @property({
    type: 'number',
    default: 0,
  })
  oustamount?: number;

  @property({
    type: 'date',
  })
  actiondate?: string;

  @property({
    type: 'string',
  })
  product?: string;

  @property({
    type: 'string',
  })
  restructure?: string;

  @property({
    type: 'number',
  })
  restructureamount?: number;

  @property({
    type: 'string',
  })
  restructuredate?: string;

  @property({
    type: 'string',
  })
  abilitytopay?: string;

  @property({
    type: 'any',
  })
  toemail?: any;

  @property({
    type: 'any',
  })
  toemailaddress?: any;


  constructor(data?: Partial<Activitylogs>) {
    super(data);
  }
}

export interface ActivitylogsRelations {
  // describe navigational properties here
}

export type ActivitylogsWithRelations = Activitylogs & ActivitylogsRelations;
