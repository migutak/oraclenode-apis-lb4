import {DefaultCrudRepository} from '@loopback/repository';
import {Permissionsettings, PermissionsettingsRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PermissionsettingsRepository extends DefaultCrudRepository<
  Permissionsettings,
  typeof Permissionsettings.prototype.sett_id,
  PermissionsettingsRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(Permissionsettings, dataSource);
  }
}
