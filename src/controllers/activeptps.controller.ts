import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {OracleDataSource} from '../datasources';

const spec = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
    },
  },
};

export class ActiveptpsController {
  constructor(
    @inject('datasources.oracle') public dataSource: OracleDataSource
  ) {}

  //activeptps
  @get('/nodeapi/activeptps/active', {
    responses: {
      '200': spec,
    },
  })
  async activeptps(
    @param.query.string('accnumber') accnumber: string,
  ): Promise<any> {
    var sql = "select * from ptps where accnumber = '" + accnumber + "' and promisedate > sysdate and lower(met) = 'not met'";

    const data = await this.dataSource.execute(sql)
    return {
      message: "success",
      data: data
    };
  }
}
