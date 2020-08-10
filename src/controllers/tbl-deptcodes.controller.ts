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
import {TblDeptcodes} from '../models';
import {TblDeptcodesRepository} from '../repositories';

export class TblDeptcodesController {
  constructor(
    @repository(TblDeptcodesRepository)
    public tblDeptcodesRepository: TblDeptcodesRepository,
  ) {}

  @post('/nodeapi/tbl-deptcodes', {
    responses: {
      '200': {
        description: 'TblDeptcodes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblDeptcodes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblDeptcodes, {
            title: 'NewTblDeptcodes',

          }),
        },
      },
    })
    tblDeptcodes: TblDeptcodes,
  ): Promise<TblDeptcodes> {
    return this.tblDeptcodesRepository.create(tblDeptcodes);
  }

  @get('/nodeapi/tbl-deptcodes/count', {
    responses: {
      '200': {
        description: 'TblDeptcodes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TblDeptcodes) where?: Where<TblDeptcodes>,
  ): Promise<Count> {
    return this.tblDeptcodesRepository.count(where);
  }

  @get('/nodeapi/tbl-deptcodes', {
    responses: {
      '200': {
        description: 'Array of TblDeptcodes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TblDeptcodes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TblDeptcodes) filter?: Filter<TblDeptcodes>,
  ): Promise<TblDeptcodes[]> {
    return this.tblDeptcodesRepository.find(filter);
  }

  @patch('/nodeapi/tbl-deptcodes', {
    responses: {
      '200': {
        description: 'TblDeptcodes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblDeptcodes, {partial: true}),
        },
      },
    })
    tblDeptcodes: TblDeptcodes,
    @param.where(TblDeptcodes) where?: Where<TblDeptcodes>,
  ): Promise<Count> {
    return this.tblDeptcodesRepository.updateAll(tblDeptcodes, where);
  }

  @get('/nodeapi/tbl-deptcodes/{id}', {
    responses: {
      '200': {
        description: 'TblDeptcodes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TblDeptcodes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TblDeptcodes, {exclude: 'where'}) filter?: FilterExcludingWhere<TblDeptcodes>
  ): Promise<TblDeptcodes> {
    return this.tblDeptcodesRepository.findById(id, filter);
  }

  @patch('/nodeapi/tbl-deptcodes/{id}', {
    responses: {
      '204': {
        description: 'TblDeptcodes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblDeptcodes, {partial: true}),
        },
      },
    })
    tblDeptcodes: TblDeptcodes,
  ): Promise<void> {
    await this.tblDeptcodesRepository.updateById(id, tblDeptcodes);
  }

  @put('/nodeapi/tbl-deptcodes/{id}', {
    responses: {
      '204': {
        description: 'TblDeptcodes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tblDeptcodes: TblDeptcodes,
  ): Promise<void> {
    await this.tblDeptcodesRepository.replaceById(id, tblDeptcodes);
  }

  @del('/nodeapi/tbl-deptcodes/{id}', {
    responses: {
      '204': {
        description: 'TblDeptcodes DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tblDeptcodesRepository.deleteById(id);
  }
}
