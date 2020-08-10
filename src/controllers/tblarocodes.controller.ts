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
import {Tblarocodes} from '../models';
import {TblarocodesRepository} from '../repositories';

export class TblarocodesController {
  constructor(
    @repository(TblarocodesRepository)
    public tblarocodesRepository: TblarocodesRepository,
  ) {}

  @post('/nodeapi/tblarocodes', {
    responses: {
      '200': {
        description: 'Tblarocodes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tblarocodes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tblarocodes, {
            title: 'NewTblarocodes',

          }),
        },
      },
    })
    tblarocodes: Tblarocodes,
  ): Promise<Tblarocodes> {
    return this.tblarocodesRepository.create(tblarocodes);
  }

  @get('/nodeapi/tblarocodes/count', {
    responses: {
      '200': {
        description: 'Tblarocodes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Tblarocodes) where?: Where<Tblarocodes>,
  ): Promise<Count> {
    return this.tblarocodesRepository.count(where);
  }

  @get('/nodeapi/tblarocodes', {
    responses: {
      '200': {
        description: 'Array of Tblarocodes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Tblarocodes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Tblarocodes) filter?: Filter<Tblarocodes>,
  ): Promise<Tblarocodes[]> {
    return this.tblarocodesRepository.find(filter);
  }

  @patch('/nodeapi/tblarocodes', {
    responses: {
      '200': {
        description: 'Tblarocodes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tblarocodes, {partial: true}),
        },
      },
    })
    tblarocodes: Tblarocodes,
    @param.where(Tblarocodes) where?: Where<Tblarocodes>,
  ): Promise<Count> {
    return this.tblarocodesRepository.updateAll(tblarocodes, where);
  }

  @get('/nodeapi/tblarocodes/{id}', {
    responses: {
      '200': {
        description: 'Tblarocodes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tblarocodes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tblarocodes, {exclude: 'where'}) filter?: FilterExcludingWhere<Tblarocodes>
  ): Promise<Tblarocodes> {
    return this.tblarocodesRepository.findById(id, filter);
  }

  @patch('/nodeapi/tblarocodes/{id}', {
    responses: {
      '204': {
        description: 'Tblarocodes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tblarocodes, {partial: true}),
        },
      },
    })
    tblarocodes: Tblarocodes,
  ): Promise<void> {
    await this.tblarocodesRepository.updateById(id, tblarocodes);
  }

  @put('/nodeapi/tblarocodes/{id}', {
    responses: {
      '204': {
        description: 'Tblarocodes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tblarocodes: Tblarocodes,
  ): Promise<void> {
    await this.tblarocodesRepository.replaceById(id, tblarocodes);
  }

  @del('/nodeapi/tblarocodes/{id}', {
    responses: {
      '204': {
        description: 'Tblarocodes DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tblarocodesRepository.deleteById(id);
  }
}
