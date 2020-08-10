import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'tbl_deptcodes',
  settings: {
    strict: true,
    OracleDataSource: {
      table: 'tbl_deptcodes',
      schema: 'ecol'
    },
  }
})
export class TblDeptcodes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  deptcode: string;

  @property({
    type: 'string',
    required: true,
  })
  employername: string;


  constructor(data?: Partial<TblDeptcodes>) {
    super(data);
  }
}

export interface TblDeptcodesRelations {
  // describe navigational properties here
}

export type TblDeptcodesWithRelations = TblDeptcodes & TblDeptcodesRelations;
