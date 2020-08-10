import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'tbl_allocations_region',
  settings: {
    strict: true,
    OracleDataSource: {
      table: 'tbl_allocations_region',
      schema: 'ecol'
    },
  }
})
export class TblAllocationsRegion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  branchcode: string;

  @property({
    type: 'string',
    required: true,
  })
  branchname: string;

  @property({
    type: 'string',
  })
  region?: string;

  @property({
    type: 'string',
  })
  msme_af?: string;

  @property({
    type: 'string',
  })
  msme_ipf?: string;

  @property({
    type: 'string',
  })
  msme_sme?: string;

  @property({
    type: 'string',
  })
  msme_staff?: string;

  @property({
    type: 'string',
  })
  msme_mcu?: string;

  @property({
    type: 'string',
  })
  msme_bb?: string;

  @property({
    type: 'string',
  })
  msme_sacco?: string;

  @property({
    type: 'string',
  })
  msme_agrib?: string;

  @property({
    type: 'string',
  })
  msme_mortgage?: string;

  @property({
    type: 'string',
  })
  msme_personal?: string;


  constructor(data?: Partial<TblAllocationsRegion>) {
    super(data);
  }
}

export interface TblAllocationsRegionRelations {
  // describe navigational properties here
}

export type TblAllocationsRegionWithRelations = TblAllocationsRegion & TblAllocationsRegionRelations;
