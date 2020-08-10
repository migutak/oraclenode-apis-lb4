import {DefaultCrudRepository} from '@loopback/repository';
import {Tblarocodes, TblarocodesRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TblarocodesRepository extends DefaultCrudRepository<
  Tblarocodes,
  typeof Tblarocodes.prototype.arocode,
  TblarocodesRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(Tblarocodes, dataSource);
  }
}
