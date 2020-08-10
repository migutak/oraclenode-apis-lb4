import {DefaultCrudRepository} from '@loopback/repository';
import {Tqall, TqallRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TqallRepository extends DefaultCrudRepository<
  Tqall,
  typeof Tqall.prototype.accnumber,
  TqallRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(Tqall, dataSource);
  }
}
