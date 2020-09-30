import {DefaultCrudRepository} from '@loopback/repository';
import {WatchStage, WatchStageRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class WatchStageRepository extends DefaultCrudRepository<
  WatchStage,
  typeof WatchStage.prototype.accnumber,
  WatchStageRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(WatchStage, dataSource);
  }
}
