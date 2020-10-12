import {DefaultCrudRepository} from '@loopback/repository';
import {Vallnotes, VallnotesRelations} from '../models';
import {OracleDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VallnotesRepository extends DefaultCrudRepository<
  Vallnotes,
  typeof Vallnotes.prototype.id,
  VallnotesRelations
> {
  constructor(
    @inject('datasources.oracle') dataSource: OracleDataSource,
  ) {
    super(Vallnotes, dataSource);
  }
}
