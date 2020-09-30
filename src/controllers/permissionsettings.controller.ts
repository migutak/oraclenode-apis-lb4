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
import {Permissionsettings} from '../models';
import {PermissionsettingsRepository} from '../repositories';

export class PermissionsettingsController {
  constructor(
    @repository(PermissionsettingsRepository)
    public permissionsettingsRepository: PermissionsettingsRepository,
  ) {}

  @post('/nodeapi/permissionsettings', {
    responses: {
      '200': {
        description: 'Permissionsettings model instance',
        content: {'application/json': {schema: getModelSchemaRef(Permissionsettings)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permissionsettings, {
            title: 'NewPermissionsettings',
            exclude: ['sett_id'],
          }),
        },
      },
    })
    permissionsettings: Omit<Permissionsettings, 'sett_id'>,
  ): Promise<Permissionsettings> {
    return this.permissionsettingsRepository.create(permissionsettings);
  }

  @get('/nodeapi/permissionsettings/count', {
    responses: {
      '200': {
        description: 'Permissionsettings model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Permissionsettings) where?: Where<Permissionsettings>,
  ): Promise<Count> {
    return this.permissionsettingsRepository.count(where);
  }

  @get('/nodeapi/permissionsettings', {
    responses: {
      '200': {
        description: 'Array of Permissionsettings model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Permissionsettings, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Permissionsettings) filter?: Filter<Permissionsettings>,
  ): Promise<Permissionsettings[]> {
    return this.permissionsettingsRepository.find(filter);
  }

  @patch('/nodeapi/permissionsettings', {
    responses: {
      '200': {
        description: 'Permissionsettings PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permissionsettings, {partial: true}),
        },
      },
    })
    permissionsettings: Permissionsettings,
    @param.where(Permissionsettings) where?: Where<Permissionsettings>,
  ): Promise<Count> {
    return this.permissionsettingsRepository.updateAll(permissionsettings, where);
  }

  @get('/nodeapi/permissionsettings/{id}', {
    responses: {
      '200': {
        description: 'Permissionsettings model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Permissionsettings, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Permissionsettings, {exclude: 'where'}) filter?: FilterExcludingWhere<Permissionsettings>
  ): Promise<Permissionsettings> {
    return this.permissionsettingsRepository.findById(id, filter);
  }

  @patch('/nodeapi/permissionsettings/{id}', {
    responses: {
      '204': {
        description: 'Permissionsettings PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permissionsettings, {partial: true}),
        },
      },
    })
    permissionsettings: Permissionsettings,
  ): Promise<void> {
    await this.permissionsettingsRepository.updateById(id, permissionsettings);
  }

  @put('/nodeapi/permissionsettings/{id}', {
    responses: {
      '204': {
        description: 'Permissionsettings PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() permissionsettings: Permissionsettings,
  ): Promise<void> {
    await this.permissionsettingsRepository.replaceById(id, permissionsettings);
  }

  @del('/nodeapi/permissionsettings/{id}', {
    responses: {
      '204': {
        description: 'Permissionsettings DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.permissionsettingsRepository.deleteById(id);
  }
}
