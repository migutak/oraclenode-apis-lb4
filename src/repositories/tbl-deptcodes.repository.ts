import {DefaultCrudRepository} from '@loopback/repository';
import {TblDeptcodes, TblDeptcodesRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TblDeptcodesRepository extends DefaultCrudRepository<
  TblDeptcodes,
  typeof TblDeptcodes.prototype.deptcode,
  TblDeptcodesRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(TblDeptcodes, dataSource);
  }
}
