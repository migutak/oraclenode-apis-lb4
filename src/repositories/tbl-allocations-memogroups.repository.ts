import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OracleDataSource} from '../datasources';
import {TblAllocateionsMemogroupsRelations, TblAllocationsMemogroups} from '../models';

export class TblAllocateionsMemogroupsRepository extends DefaultCrudRepository<
  TblAllocationsMemogroups,
  typeof TblAllocationsMemogroups.prototype.memogroup,
  TblAllocateionsMemogroupsRelations
  > {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(TblAllocationsMemogroups, dataSource);
  }
}
