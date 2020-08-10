import {DefaultCrudRepository} from '@loopback/repository';
import {TblAllocationsRegion, TblAllocationsRegionRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TblAllocationsRegionRepository extends DefaultCrudRepository<
  TblAllocationsRegion,
  typeof TblAllocationsRegion.prototype.branchcode,
  TblAllocationsRegionRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(TblAllocationsRegion, dataSource);
  }
}
