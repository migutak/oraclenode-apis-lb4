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
import {Activitylogs} from '../models';
import {ActivitylogsRepository} from '../repositories';

export class ActivitylogsController {
  constructor(
    @repository(ActivitylogsRepository)
    public activitylogsRepository: ActivitylogsRepository,
  ) {}

  @post('/nodeapi/activitylogs', {
    responses: {
      '200': {
        description: 'Activitylogs model instance',
        content: {'application/json': {schema: getModelSchemaRef(Activitylogs)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activitylogs, {
            title: 'NewActivitylogs',
            exclude: ['id'],
          }),
        },
      },
    })
    activitylogs: Omit<Activitylogs, 'id'>,
  ): Promise<Activitylogs> {
    return this.activitylogsRepository.create(activitylogs);
  }

  @get('/nodeapi/activitylogs/count', {
    responses: {
      '200': {
        description: 'Activitylogs model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Activitylogs) where?: Where<Activitylogs>,
  ): Promise<Count> {
    return this.activitylogsRepository.count(where);
  }

  @get('/nodeapi/activitylogs', {
    responses: {
      '200': {
        description: 'Array of Activitylogs model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Activitylogs, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Activitylogs) filter?: Filter<Activitylogs>,
  ): Promise<Activitylogs[]> {
    return this.activitylogsRepository.find(filter);
  }

  @patch('/nodeapi/activitylogs', {
    responses: {
      '200': {
        description: 'Activitylogs PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activitylogs, {partial: true}),
        },
      },
    })
    activitylogs: Activitylogs,
    @param.where(Activitylogs) where?: Where<Activitylogs>,
  ): Promise<Count> {
    return this.activitylogsRepository.updateAll(activitylogs, where);
  }

  @get('/nodeapi/activitylogs/{id}', {
    responses: {
      '200': {
        description: 'Activitylogs model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Activitylogs, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Activitylogs, {exclude: 'where'}) filter?: FilterExcludingWhere<Activitylogs>
  ): Promise<Activitylogs> {
    return this.activitylogsRepository.findById(id, filter);
  }

  @patch('/nodeapi/activitylogs/{id}', {
    responses: {
      '204': {
        description: 'Activitylogs PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activitylogs, {partial: true}),
        },
      },
    })
    activitylogs: Activitylogs,
  ): Promise<void> {
    await this.activitylogsRepository.updateById(id, activitylogs);
  }

  @put('/nodeapi/activitylogs/{id}', {
    responses: {
      '204': {
        description: 'Activitylogs PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() activitylogs: Activitylogs,
  ): Promise<void> {
    await this.activitylogsRepository.replaceById(id, activitylogs);
  }

  @del('/nodeapi/activitylogs/{id}', {
    responses: {
      '204': {
        description: 'Activitylogs DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.activitylogsRepository.deleteById(id);
  }
}
