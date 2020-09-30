import {Entity, model, property} from '@loopback/repository';

@model()
export class Permissionsettings extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  sett_id?: number;

  @property({
    type: 'string',
  })
  role_id?: string;

  @property({
    type: 'string',
  })
  perm_id?: string;

  @property({
    type: 'string',
  })
  attr?: string;


  constructor(data?: Partial<Permissionsettings>) {
    super(data);
  }
}

export interface PermissionsettingsRelations {
  // describe navigational properties here
}

export type PermissionsettingsWithRelations = Permissionsettings & PermissionsettingsRelations;
