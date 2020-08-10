import {inject} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
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

export class DemandsController {
  constructor(
    @inject('datasources.oracle') public dataSource: OracleDataSource
  ) {}

  //demandstatus
  @post('/nodeapi/demandstatus', {
    responses: {
      '200': spec,
    },
  })
  async demandstatus
    (@requestBody(spec) body: any): Promise<any> {
    var sqlloans = "update demandsdue set status = '" + body.status + "', sentby='" + body.sentby + "', datesent=" + body.datesent + " where id=" + body.id;
    var sqlcc = "update demandsdue set status = '" + body.status + "', sentby='" + body.sentby + "', datesent=" + body.datesent + " where id=" + body.id;

    var sql = sqlloans;
    if (body.from == 'cc') {
      sql = sqlcc
    }

    await this.dataSource.execute(sql)

    return {
      message: "success",
      details: "demand record status is updated!"
    };
  }
}
