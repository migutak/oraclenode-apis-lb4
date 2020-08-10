import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'tbl_allocations_deptcodes',
  settings: {
    strict: true,
    OracleDataSource: {
      table: 'tbl_allocations_deptcodes',
      schema: 'ecol'
    },
  }
})

export class TblAllocationsDeptcodes extends Entity {
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
  deptcode: string;

  @property({
    type: 'string',
  })
  employername?: string;

  @property({
    type: 'string',
  })
  branchcode?: string;

  @property({
    type: 'string',
  })
  branchname?: string;

  @property({
    type: 'string',
  })
  colofficer?: string;


  constructor(data?: Partial<TblAllocationsDeptcodes>) {
    super(data);
  }
}

export interface TblAllocationsDeptcodesRelations {
  // describe navigational properties here
}

export type TblAllocationsDeptcodesWithRelations = TblAllocationsDeptcodes & TblAllocationsDeptcodesRelations;
