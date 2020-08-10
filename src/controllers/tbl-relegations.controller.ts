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
import {TblRelegations} from '../models';
import {TblRelegationsRepository} from '../repositories';

export class TblRelegationsController {
  constructor(
    @repository(TblRelegationsRepository)
    public tblRelegationsRepository: TblRelegationsRepository,
  ) {}

  @post('/nodeapi/tbl-relegations', {
    responses: {
      '200': {
        description: 'TblRelegations model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblRelegations)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblRelegations, {
            title: 'NewTblRelegations',
            exclude: ['casenumber'],
          }),
        },
      },
    })
    tblRelegations: Omit<TblRelegations, 'casenumber'>,
  ): Promise<TblRelegations> {
    return this.tblRelegationsRepository.create(tblRelegations);
  }

  @get('/nodeapi/tbl-relegations/count', {
    responses: {
      '200': {
        description: 'TblRelegations model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TblRelegations) where?: Where<TblRelegations>,
  ): Promise<Count> {
    return this.tblRelegationsRepository.count(where);
  }

  @get('/nodeapi/tbl-relegations', {
    responses: {
      '200': {
        description: 'Array of TblRelegations model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TblRelegations, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TblRelegations) filter?: Filter<TblRelegations>,
  ): Promise<TblRelegations[]> {
    return this.tblRelegationsRepository.find(filter);
  }

  @patch('/nodeapi/tbl-relegations', {
    responses: {
      '200': {
        description: 'TblRelegations PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblRelegations, {partial: true}),
        },
      },
    })
    tblRelegations: TblRelegations,
    @param.where(TblRelegations) where?: Where<TblRelegations>,
  ): Promise<Count> {
    return this.tblRelegationsRepository.updateAll(tblRelegations, where);
  }

  @get('/nodeapi/tbl-relegations/{id}', {
    responses: {
      '200': {
        description: 'TblRelegations model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TblRelegations, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TblRelegations, {exclude: 'where'}) filter?: FilterExcludingWhere<TblRelegations>
  ): Promise<TblRelegations> {
    return this.tblRelegationsRepository.findById(id, filter);
  }

  @patch('/nodeapi/tbl-relegations/{id}', {
    responses: {
      '204': {
        description: 'TblRelegations PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblRelegations, {partial: true}),
        },
      },
    })
    tblRelegations: TblRelegations,
  ): Promise<void> {
    await this.tblRelegationsRepository.updateById(id, tblRelegations);
  }

  @put('/nodeapi/tbl-relegations/{id}', {
    responses: {
      '204': {
        description: 'TblRelegations PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tblRelegations: TblRelegations,
  ): Promise<void> {
    await this.tblRelegationsRepository.replaceById(id, tblRelegations);
  }

  @del('/nodeapi/tbl-relegations/{id}', {
    responses: {
      '204': {
        description: 'TblRelegations DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tblRelegationsRepository.deleteById(id);
  }
}
