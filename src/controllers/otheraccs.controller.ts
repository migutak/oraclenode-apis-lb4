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

export class OtheraccsController {
  constructor(
    @inject('datasources.oracle') public dataSource: OracleDataSource
  ) {}

  //otheraccs
  @get('/nodeapi/otheraccs/all', {
    responses: {
      '200': spec,
    },
  })
  async otheraccs(
    @param.query.string('custnumber') custnumber: string,
  ): Promise<any> {
    var sql = "select * from custview_stage where custnumber= " + custnumber + " order by outsbalance desc";

    const data = await this.dataSource.execute(sql)
    return {
      message: "success",
      data: data
    };
  }
}
