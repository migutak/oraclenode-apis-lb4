import {DefaultCrudRepository} from '@loopback/repository';
import {Notehis, NotehisRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NotehisRepository extends DefaultCrudRepository<
  Notehis,
  typeof Notehis.prototype.id,
  NotehisRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(Notehis, dataSource);
  }
}
