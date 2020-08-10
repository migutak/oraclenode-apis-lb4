import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'tbl_allocations_memogroups',
  settings: {
    strict: true,
    OracleDataSource: {
      table: 'tbl_allocations_memogroups',
      schema: 'ecol'
    },
  }
})


export class TblAllocationsMemogroups extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  memogroup: string;

  @property({
    type: 'string',
  })
  productcode?: string;

  @property({
    type: 'string',
  })
  businessunit?: string;

  @property({
    type: 'string',
  })
  remedialunit?: string;

  @property({
    type: 'string',
    default: 'n',
  })
  vshared?: string;

  @property({
    type: 'string',
  })
  lastupdateby?: string;

  @property({
    type: 'date'
  })
  lastupdatedate?: Date;

  @property({
    type: 'string',
  })
  additionalcriteria?: string;

  @property({
    type: 'string',
  })
  coopflag?: string;

  @property({
    type: 'string',
  })
  facilityamount?: number;

  @property({
    type: 'string',
  })
  primaryremedialunit?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TblAllocationsMemogroups>) {
    super(data);
  }
}

export interface TblAllocateionsMemogroupsRelations {
  // describe navigational properties here
}

export type TblAllocateionsMemogroupsWithRelations = TblAllocationsMemogroups & TblAllocateionsMemogroupsRelations;
