import {inject} from '@loopback/core';
import {get, param, post, requestBody} from '@loopback/rest';
import {OracleDataSource} from '../datasources';

export type Demand = {
  accnumber: string;
};

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

export class LoansController {
  constructor(
    @inject('datasources.oracle') public dataSource: OracleDataSource
  ) {}

  // memos
  @get('/nodeapi/loans/memos', {
    responses: {
      '200': spec,
    },
  })
  async findmemos(
  ): Promise<any> {
    const data = this.dataSource.execute('select distinct cycle memo from cards_stage union select distinct substr(accnumber,3,3) memo from loans_stage')
    return data;
  }

  //arocodes
  @get('/nodeapi/loans/arocodes', {
    responses: {
      '200': spec,
    },
  })
  async findarocodes(
  ): Promise<any> {
    const data = this.dataSource.execute('select distinct arocode from loans_stage')
    return data;
  }

  //branches
  @get('/nodeapi/loans/branches', {
    responses: {
      '200': spec,
    },
  })
  async branches(
  ): Promise<any> {
    const data = this.dataSource.execute('select buckets, sum(abs(outbalance))  from tqall group by buckets order by buckets')
    return data;
  }

  //productcode
  @get('/nodeapi/loans/productcode', {
    responses: {
      '200': spec,
    },
  })
  async productcode(
  ): Promise<any> {
    const data = this.dataSource.execute('select distinct productcode from loans_stage order by productcode')
    return data;
  }

  //buckets
  @get('/nodeapi/loans/buckets', {
    responses: {
      '200': spec,
    },
  })
  async buckets(
  ): Promise<any> {
    const resp = this.dataSource.execute('select bucket, sum(abs(oustbalance)) value, count(accnumber) volume from tqall where productcode not in (\'CAwOD\',\'fixdep\',\'LoanOD\',\'SAMinBal\',\'savings\') group by bucket order by bucket')

    return resp;
  }

  //brokenptps
  @get('/nodeapi/loans/brokenptps', {
    responses: {
      '200': spec,
    },
  })
  async brokenptps(
  ): Promise<any> {
    const data = this.dataSource.execute('select count(*) total from ptps p join tqall t on p.accnumber=t.accnumber where p.met !=\'met\'')
    return data;
  }

  //demandlettersdue
  @get('/nodeapi/loans/demandlettersdue', {
    responses: {
      '200': spec,
    },
  })
  async demandlettersdue(
  ): Promise<any> {
    const data = this.dataSource.execute('Select count(*) totalviewall from demandsdue')
    return data;
  }

  //demandlettersccdue
  @get('/nodeapi/loans/demandlettersccdue', {
    responses: {
      '200': spec,
    },
  })
  async demandlettersccdue(
  ): Promise<any> {
    const data = this.dataSource.execute('Select count(*) totalviewall from demandsduecc')
    return data;
  }

  //autodemands
  @get('/nodeapi/loans/autodemands', {
    responses: {
      '200': spec,
    },
  })
  async autodemands(
  ): Promise<object> {
    const result = await this.dataSource.execute('select * from autoletters where active = \'true\'');
    var overalResult = [];
    for (var i = 0; i < result.length; i++) {
      const memogrp = result[i].MEMOGROUP;
      const daysinarr = result[i].DAYSINARR;
      const letterid = result[i].LETTERID;

      const sqlInsert = "select accnumber,custnumber,daysinarr, '" + letterid + "' demand from tqall where substr(accnumber,3,3) = '" + memogrp + "' and daysinarr = " + daysinarr;
      const selectResult = await this.dataSource.execute(sqlInsert);
      if (selectResult.length > 0) {console.log(selectResult.rows)};
      overalResult = selectResult;
    };
    return {
      message: "success",
      data: overalResult
    };
  }

  //addDemand
  @post('/nodeapi/loans/addDemand', {
    responses: {
      '200': spec,
    },
  })
  addDemand(@requestBody(spec) demand: Demand): string {
    this.dataSource.execute('insert into test(accnumber) values(\'' + demand.accnumber + '\')')
    return 'OK';
  }

  //teles
  @get('/nodeapi/teles/all', {
    responses: {
      '200': spec,
    },
  })
  async teles(
    @param.query.string('custnumber') custnumber: string,
  ): Promise<any> {
    var sqlloans = "select telnumber, 'primary' source from customers_stage where custnumber = '" + custnumber + "' and telnumber is not null union " +
      "select celnumber, 'primary' from watch_stage where custnumber = '" + custnumber + "' and celnumber is not null union " +
      "select celnumber, 'primary' from customers_stage where custnumber = '" + custnumber + "' and celnumber is not null union " +
      "select telnumber, 'primary' from watch_stage where custnumber = '" + custnumber + "' and telnumber is not null union " +
      "select mobile, 'primary' from cards_stage where cardacct = '" + custnumber + "' and mobile is not null union " +
      "select mobile, 'primary' from cards_watch_stage where cardacct = '" + custnumber + "' and mobile is not null union " +
      "select tel, 'primary' from cards_stage where cardacct = '" + custnumber + "' and tel is not null union " +
      "select tel, 'primary' from cards_watch_stage where cardacct = '" + custnumber + "' and tel is not null union " +
      "select person , 'secondary' from teles where custnumber = '" + custnumber + "' and active = 'Y' and person is not null union " +
      "select telephone , 'secondary' from teles where custnumber = '" + custnumber + "' and active in ('Y','Yes') and telephone is not null"

    const data = await this.dataSource.execute(sqlloans)
    return {
      message: "success",
      data: data
    };
  }

}
