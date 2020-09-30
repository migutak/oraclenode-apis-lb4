import {Entity, model, property} from '@loopback/repository';

@model()
export class WatchStage extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  accnumber: string;

  @property({
    type: 'number',
    required: true,
  })
  custnumber: number;

  @property({
    type: 'string',
  })
  custname?: string;

  @property({
    type: 'string',
  })
  currency?: string;

  @property({
    type: 'number',
  })
  oustbalance?: number;

  @property({
    type: 'string',
  })
  repaymentamount?: string;

  @property({
    type: 'string',
  })
  repaymentdate?: string;

  @property({
    type: 'string',
  })
  productcode?: string;

  @property({
    type: 'string',
  })
  arocode?: string;

  @property({
    type: 'string',
  })
  branchcode?: string;

  @property({
    type: 'string',
  })
  settleaccno?: string;

  @property({
    type: 'number',
  })
  settleaccbal?: number;

  @property({
    type: 'string',
  })
  addressline1?: string;

  @property({
    type: 'string',
  })
  town?: string;

  @property({
    type: 'string',
  })
  celnumber?: string;

  @property({
    type: 'string',
  })
  telnumber?: string;

  @property({
    type: 'string',
  })
  emailaddress?: string;

  @property({
    type: 'string',
  })
  dob?: string;

  @property({
    type: 'string',
  })
  nationid?: string;

  @property({
    type: 'string',
  })
  deptcode?: string;

  @property({
    type: 'string',
  })
  employer?: string;

  @property({
    type: 'string',
  })
  employerno?: string;


  constructor(data?: Partial<WatchStage>) {
    super(data);
  }
}

export interface WatchStageRelations {
  // describe navigational properties here
}

export type WatchStageWithRelations = WatchStage & WatchStageRelations;
