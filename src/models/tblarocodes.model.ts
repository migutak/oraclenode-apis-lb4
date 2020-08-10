import {Entity, model, property} from '@loopback/repository';

@model()
export class Tblarocodes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  arocode: string;

  @property({
    type: 'string',
  })
  colofficer?: string;


  constructor(data?: Partial<Tblarocodes>) {
    super(data);
  }
}

export interface TblarocodesRelations {
  // describe navigational properties here
}

export type TblarocodesWithRelations = Tblarocodes & TblarocodesRelations;
