import {DefaultCrudRepository} from '@loopback/repository';
import {Activitylogs, ActivitylogsRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ActivitylogsRepository extends DefaultCrudRepository<
  Activitylogs,
  typeof Activitylogs.prototype.id,
  ActivitylogsRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(Activitylogs, dataSource);
  }
}
