import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  put,

  requestBody
} from '@loopback/rest';
import {OracleDataSource} from '../datasources';
import {Ptps} from '../models';
import {PtpsRepository} from '../repositories';

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

export class PtpsController {
  constructor(
    @inject('datasources.oracle') public dataSource: OracleDataSource,
    @repository(PtpsRepository)
    public ptpsRepository: PtpsRepository,
  ) {}

  @post('/nodeapi/ptps', {
    responses: {
      '200': {
        description: 'Ptps model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ptps)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ptps, {
            title: 'NewPtps',
            exclude: ['id'],
          }),
        },
      },
    })
    ptps: Omit<Ptps, 'id'>,
  ): Promise<Ptps> {
    return this.ptpsRepository.create(ptps);
  }

  @get('/nodeapi/ptps/count', {
    responses: {
      '200': {
        description: 'Ptps model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Ptps) where?: Where<Ptps>,
  ): Promise<Count> {
    return this.ptpsRepository.count(where);
  }

  @get('/nodeapi/ptps', {
    responses: {
      '200': {
        description: 'Array of Ptps model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ptps, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Ptps) filter?: Filter<Ptps>,
  ): Promise<Ptps[]> {
    return this.ptpsRepository.find(filter);
  }

  @patch('/nodeapi/ptps', {
    responses: {
      '200': {
        description: 'Ptps PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ptps, {partial: true}),
        },
      },
    })
    ptps: Ptps,
    @param.where(Ptps) where?: Where<Ptps>,
  ): Promise<Count> {
    return this.ptpsRepository.updateAll(ptps, where);
  }

  @get('/nodeapi/ptps/{id}', {
    responses: {
      '200': {
        description: 'Ptps model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ptps, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ptps, {exclude: 'where'}) filter?: FilterExcludingWhere<Ptps>
  ): Promise<Ptps> {
    return this.ptpsRepository.findById(id, filter);
  }

  @patch('/nodeapi/ptps/{id}', {
    responses: {
      '204': {
        description: 'Ptps PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ptps, {partial: true}),
        },
      },
    })
    ptps: Ptps,
  ): Promise<void> {
    await this.ptpsRepository.updateById(id, ptps);
  }

  @put('/nodeapi/ptps/{id}', {
    responses: {
      '204': {
        description: 'Ptps PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ptps: Ptps,
  ): Promise<void> {
    await this.ptpsRepository.replaceById(id, ptps);
  }

  @del('/nodeapi/ptps/{id}', {
    responses: {
      '204': {
        description: 'Ptps DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ptpsRepository.deleteById(id);
  }

  //gridbrokenptps
  @post('/nodeapi/ptps/gridbrokenptps', {
    responses: {
      '200': spec,
    },
  })
  async gridbrokenptps
    (@requestBody(spec) body: object): Promise<any> {
    const result = await this.dataSource.execute(this.buildSql(body))
    const rowCount = this.getRowCount(body, result);
    const resultsForPage = this.cutResultsToPageSize(body, result);
    return {
      lastRow: rowCount,
      rows: resultsForPage
    };
  }

  buildSql(request: any) {
    const selectSql = this.createSelectSql(request);
    const fromSql = ' from ptps p join tqall t on p.accnumber=t.accnumber where p.met !=\'met\' ';
    const whereSql = this.createWhereSql(request);
    const limitSql = this.createLimitSql(request);

    const orderBySql = this.createOrderBySql(request);
    const groupBySql = this.createGroupBySql(request);

    const SQL = selectSql + fromSql + whereSql + groupBySql + orderBySql + limitSql;

    console.log(SQL);

    return SQL;
  }

  createSelectSql(request: any) {
    //console.log(request)
    const rowGroupCols = request.rowGroupCols;
    const valueCols = request.valueCols;
    const groupKeys = request.groupKeys;

    if (this.isDoingGrouping(rowGroupCols, groupKeys)) {
      const colsToSelect = [];

      const rowGroupCol = rowGroupCols[groupKeys.length];
      colsToSelect.push(rowGroupCol.field);

      valueCols.forEach(function (valueCol: any) {
        colsToSelect.push(valueCol.aggFunc + '(' + valueCol.field + ') as ' + valueCol.field);
      });

      return ' select ' + colsToSelect.join(', ');
    }

    return ' select *';
  }

  createFilterSql(key: any, item: any) {
    switch (item.filterType) {
      case 'text':
        return this.createTextFilterSql(key, item);
      case 'number':
        return this.createNumberFilterSql(key, item);
      default:
        console.log('unkonwn filter type: ' + item.filterType);
    }
  }

  createNumberFilterSql(key: any, item: any) {
    switch (item.type) {
      case 'equals':
        return key + ' = ' + item.filter;
      case 'notEqual':
        return key + ' != ' + item.filter;
      case 'greaterThan':
        return key + ' > ' + item.filter;
      case 'greaterThanOrEqual':
        return key + ' >= ' + item.filter;
      case 'lessThan':
        return key + ' < ' + item.filter;
      case 'lessThanOrEqual':
        return key + ' <= ' + item.filter;
      case 'inRange':
        return '(' + key + ' >= ' + item.filter + ' and ' + key + ' <= ' + item.filterTo + ')';
      default:
        console.log('unknown number filter type: ' + item.type);
        return 'true';
    }
  }

  createTextFilterSql(key: any, item: any) {
    switch (item.type) {
      case 'equals':
        return 'upper(' + key + ') = \'' + (item.filter).toUpperCase() + '\'';
      case 'notEqual':
        return 'upper(' + key + ') != \'' + (item.filter).toUpperCase() + '\'';
      case 'contains':
        return 'upper(' + key + ') like \'%' + (item.filter).toUpperCase() + '%\'';
      case 'notContains':
        return 'upper(' + key + ') not like \'%' + (item.filter).toUpperCase() + '%\'';
      case 'startsWith':
        return 'upper(' + key + ') like \'' + (item.filter).toUpperCase() + '%\'';
      case 'endsWith':
        return 'upper(' + key + ') like \'%' + (item.filter).toUpperCase() + '\'';
      default:
        console.log('unknown text filter type: ' + item.type);
        return 'true';
    }
  }

  createWhereSql(request: any) {
    const rowGroupCols = request.rowGroupCols;
    const groupKeys = request.groupKeys;
    const filterModel = request.filterModel;

    // console.log(filterModel)

    const that = this;
    const whereParts: any = [];

    if (groupKeys.length > 0) {
      groupKeys.forEach(function (key: any, index: any) {
        const colName = rowGroupCols[index].field;
        whereParts.push(colName + '= \'' + key + '\'')
        //   whereParts.push(colName +  '= "' + key + '"')
      });
    }

    if (filterModel) {
      const keySet = Object.keys(filterModel);
      keySet.forEach(function (key) {
        const item = filterModel[key];
        //console.log(item);
        //console.log('key__',key);
        whereParts.push(that.createFilterSql(key, item));
      });
    }

    if (whereParts.length > 0) {
      return ' where ' + whereParts.join(' and ');
    } else {
      return '';
    }
  }

  createGroupBySql(request: any) {
    const rowGroupCols = request.rowGroupCols;
    const groupKeys = request.groupKeys;

    if (this.isDoingGrouping(rowGroupCols, groupKeys)) {
      const colsToGroupBy = [];

      const rowGroupCol = rowGroupCols[groupKeys.length];
      colsToGroupBy.push(rowGroupCol.field);

      return ' group by ' + colsToGroupBy.join(', ');
    } else {
      // select all columns
      return '';
    }
  }

  createOrderBySql(request: any) {
    const rowGroupCols = request.rowGroupCols;
    const groupKeys = request.groupKeys;
    const sortModel = request.sortModel;

    const grouping = this.isDoingGrouping(rowGroupCols, groupKeys);

    const sortParts: any = [];
    if (sortModel) {

      const groupColIds =
        rowGroupCols.map((groupCol: {id: any;}) => groupCol.id)
          .slice(0, groupKeys.length + 1);

      sortModel.forEach(function (item: any) {
        if (grouping && groupColIds.indexOf(item.colId) < 0) {
          // ignore
        } else {
          sortParts.push(item.colId + ' ' + item.sort);
        }
      });
    }

    if (sortParts.length > 0) {
      return ' order by ' + sortParts.join(', ');
    } else {
      return '';
    }
  }

  isDoingGrouping(rowGroupCols: any, groupKeys: any) {
    // we are not doing grouping if at the lowest level. we are at the lowest level
    // if we are grouping by more columns than we have keys for (that means the user
    // has not expanded a lowest level group, OR we are not grouping at all).
    return rowGroupCols.length > groupKeys.length;
  }

  createLimitSql(request: any) {
    const startRow = request.startRow;
    const endRow = request.endRow;
    const pageSize = endRow - startRow;

    return ' OFFSET ' + startRow + ' ROWS FETCH NEXT ' + (pageSize + 1) + ' ROWS only'
    // return ' limit ' + (pageSize + 1) + ' offset ' + startRow;
  }


  cutResultsToPageSize(request: any, results: any) {
    const pageSize = request.endRow - request.startRow;
    if (results && results.length > pageSize) {
      return results.splice(0, pageSize);
    } else {
      return results;
    }
  }

  getRowCount(request: any, results: any) {
    if (results === null || results === undefined || results.length === 0) {
      return null;
    }
    const currentLastRow = request.startRow + results.length;
    return currentLastRow <= request.endRow ? currentLastRow : -1;
  }
}
