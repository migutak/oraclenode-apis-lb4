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
import {Vallnotes} from '../models';
import {VallnotesRepository} from '../repositories';

export class VallnotesController {
  constructor(
    @repository(VallnotesRepository)
    public vallnotesRepository: VallnotesRepository,
  ) {}

  @post('/nodeapi/vallnotes', {
    responses: {
      '200': {
        description: 'Vallnotes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vallnotes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vallnotes, {
            title: 'NewVallnotes',
            exclude: ['id'],
          }),
        },
      },
    })
    vallnotes: Omit<Vallnotes, 'id'>,
  ): Promise<Vallnotes> {
    return this.vallnotesRepository.create(vallnotes);
  }

  @get('/nodeapi/vallnotes/count', {
    responses: {
      '200': {
        description: 'Vallnotes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Vallnotes) where?: Where<Vallnotes>,
  ): Promise<Count> {
    return this.vallnotesRepository.count(where);
  }

  @get('/nodeapi/vallnotes', {
    responses: {
      '200': {
        description: 'Array of Vallnotes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Vallnotes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Vallnotes) filter?: Filter<Vallnotes>,
  ): Promise<Vallnotes[]> {
    return this.vallnotesRepository.find(filter);
  }

  @patch('/nodeapi/vallnotes', {
    responses: {
      '200': {
        description: 'Vallnotes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vallnotes, {partial: true}),
        },
      },
    })
    vallnotes: Vallnotes,
    @param.where(Vallnotes) where?: Where<Vallnotes>,
  ): Promise<Count> {
    return this.vallnotesRepository.updateAll(vallnotes, where);
  }

  @get('/nodeapi/vallnotes/{id}', {
    responses: {
      '200': {
        description: 'Vallnotes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vallnotes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Vallnotes, {exclude: 'where'}) filter?: FilterExcludingWhere<Vallnotes>
  ): Promise<Vallnotes> {
    return this.vallnotesRepository.findById(id, filter);
  }

  @patch('/nodeapi/vallnotes/{id}', {
    responses: {
      '204': {
        description: 'Vallnotes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vallnotes, {partial: true}),
        },
      },
    })
    vallnotes: Vallnotes,
  ): Promise<void> {
    await this.vallnotesRepository.updateById(id, vallnotes);
  }

  @put('/nodeapi/vallnotes/{id}', {
    responses: {
      '204': {
        description: 'Vallnotes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vallnotes: Vallnotes,
  ): Promise<void> {
    await this.vallnotesRepository.replaceById(id, vallnotes);
  }

  @del('/nodeapi/vallnotes/{id}', {
    responses: {
      '204': {
        description: 'Vallnotes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vallnotesRepository.deleteById(id);
  }
}
