import {Entity, model, property} from '@loopback/repository';

@model()
export class Tblusers extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: false,
  })
  active: string;

  @property({
    type: 'string',
    required: false,
  })
  onleave: string;

  @property({
    type: 'date',
    required: false,
    default: () => new Date()
  })
  createdate: string;

  @property({
    type: 'string',
    required: false,
  })
  accessrights: string;

  @property({
    type: 'string',
    required: false,
  })
  isteamleader: string;

  @property({
    type: 'string',
    required: false,
  })
  manager: string;

  @property({
    type: 'string',
    required: false,
  })
  division: string;

  @property({
    type: 'string',
    required: false,
  })
  dateloglast: string;

  @property({
    type: 'string',
    required: false,
  })
  loggedin: string;

  @property({
    type: 'string',
    required: false,
  })
  loked: string;
  @property({
    type: 'string',
    required: false,
  })
  email: string;
  @property({
    type: 'string',
    required: false,
  })
  expirydate: string;
  @property({
    type: 'string',
    required: false,
  })
  role: string;

  @property({
    type: 'string',
    required: false,
  })
  branch: string;

  @property({
    type: 'string',
    required: false,
  })
  vonline: string;

  @property({
    type: 'string',
    required: false,
  })
  telecollector: string;

  @property({
    type: 'string',
    required: false,
  })
  team: string;


  constructor(data?: Partial<Tblusers>) {
    super(data);
  }
}

export interface TblusersRelations {
  // describe navigational properties here
}

export type TblusersWithRelations = Tblusers & TblusersRelations;
