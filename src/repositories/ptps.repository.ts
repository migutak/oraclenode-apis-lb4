import {DefaultCrudRepository} from '@loopback/repository';
import {Ptps, PtpsRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PtpsRepository extends DefaultCrudRepository<
  Ptps,
  typeof Ptps.prototype.id,
  PtpsRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(Ptps, dataSource);
  }
}
