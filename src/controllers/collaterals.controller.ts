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

export class CollateralsController {
  constructor(
    @inject('datasources.oracle') public dataSource: OracleDataSource
  ) {}

  //otheraccs
  @get('/nodeapi/collaterals', {
    responses: {
      '200': spec,
    },
  })
  async otheraccs(
    @param.query.string('accnumber') accnumber: string,
  ): Promise<any> {
    var sql = "select * from colateral_stage where accnumber= '" + accnumber + "'";

    const data = await this.dataSource.execute(sql)
    return {
      message: "success",
      data: data
    };
  }
}
