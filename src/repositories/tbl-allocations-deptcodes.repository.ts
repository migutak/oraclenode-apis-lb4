import {DefaultCrudRepository} from '@loopback/repository';
import {TblAllocationsDeptcodes, TblAllocationsDeptcodesRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TblAllocationsDeptcodesRepository extends DefaultCrudRepository<
  TblAllocationsDeptcodes,
  typeof TblAllocationsDeptcodes.prototype.id,
  TblAllocationsDeptcodesRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(TblAllocationsDeptcodes, dataSource);
  }
}
