import {DefaultCrudRepository} from '@loopback/repository';
import {Tblusers, TblusersRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TblusersRepository extends DefaultCrudRepository<
  Tblusers,
  typeof Tblusers.prototype.username,
  TblusersRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(Tblusers, dataSource);
  }
}
