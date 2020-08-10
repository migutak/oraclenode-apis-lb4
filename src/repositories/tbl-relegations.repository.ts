import {DefaultCrudRepository} from '@loopback/repository';
import {TblRelegations, TblRelegationsRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TblRelegationsRepository extends DefaultCrudRepository<
  TblRelegations,
  typeof TblRelegations.prototype.casenumber,
  TblRelegationsRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(TblRelegations, dataSource);
  }
}
