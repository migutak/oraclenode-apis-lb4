import {Entity, model, property} from '@loopback/repository';

@model()
export class Vallnotes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  accnumber?: string;

  @property({
    type: 'string',
  })
  custnumber?: string;

  @property({
    type: 'string',
  })
  notemade?: string;

  @property({
    type: 'string',
  })
  owner?: string;

  @property({
    type: 'string',
  })
  noteimp?: string;

  @property({
    type: 'string',
  })
  notesrc?: string;

  @property({
    type: 'date',
  })
  notedate?: string;

  @property({
    type: 'string',
  })
  reason?: string;


  constructor(data?: Partial<Vallnotes>) {
    super(data);
  }
}

export interface VallnotesRelations {
  // describe navigational properties here
}

export type VallnotesWithRelations = Vallnotes & VallnotesRelations;
