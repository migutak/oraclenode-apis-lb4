import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'tbl_relegations',
  settings: {
    strict: true,
    OracleDataSource: {
      table: 'tbl_relegations',
      schema: 'ecol'
    },
  }
})
//@model({settings: {strict: false}})
export class TblRelegations extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    description: "The case's number.",
    required: true,
    OracleDataSource: {
      columnName: 'casenumber',
      dataType: 'varchar2',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  casenumber: string;

  @property({
    type: 'string',
    required: true,
  })
  accnumber: string;

  @property({
    type: 'string',
    required: true,
  })
  custnumber: string;

  @property({
    type: 'string',
    required: true,
  })
  custname: string;

  @property({
    type: 'number',
  })
  daysinarr?: number;

  @property({
    type: 'number',
    default: 0,
  })
  oustbalance?: number;

  @property({
    type: 'number',
    default: 0,
  })
  totalarrears?: number;

  @property({
    type: 'string',
  })
  applink?: string;

  @property({
    type: 'string',
    required: true,
  })
  bucket: string;

  @property({
    type: 'string',
    required: true,
  })
  productcode: string;

  @property({
    type: 'string',
    required: true,
  })
  section: string;

  @property({
    type: 'string',
    required: true,
  })
  arocode: string;

  @property({
    type: 'string',
    required: true,
  })
  rrocode: string;

  @property({
    type: 'string',
    required: true,
  })
  branchcode: string;

  @property({
    type: 'string',
    required: true,
  })
  branchname: string;

  @property({
    type: 'date',
  })
  requestdate?: string;

  @property({
    type: 'string',
  })
  requestby?: string;

  @property({
    type: 'string',
  })
  approvaldate?: string;

  @property({
    type: 'string',
  })
  approvedby?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  approved?: string;

  @property({
    type: 'string',
  })
  newrrocode?: string;

  @property({
    type: 'date',
  })
  rrochangedate?: string;

  @property({
    type: 'string',
  })
  rrochangeby?: string;

  @property({
    type: 'string',
  })
  filerequested?: string;

  @property({
    type: 'date',
  })
  filerequestdate?: string;

  @property({
    type: 'string',
  })
  filerequestby?: string;

  @property({
    type: 'date',
  })
  filesenddate?: string;

  @property({
    type: 'string',
  })
  filesendby?: string;

  @property({
    type: 'date',
  })
  filereceiveddate?: string;

  @property({
    type: 'string',
  })
  filereceivedby?: string;

  // This allow TypeScript to accept other properties that are not explicitly defined above
  [prop: string]: any;

  constructor(data?: Partial<TblRelegations>) {
    super(data);
  }
}

export interface TblRelegationsRelations {
  // describe navigational properties here
}

export type TblRelegationsWithRelations = TblRelegations & TblRelegationsRelations;
