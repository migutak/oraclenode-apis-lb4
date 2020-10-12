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
import {Notehis} from '../models';
import {NotehisRepository} from '../repositories';

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

export class NotehisController {
  constructor(
    @inject('datasources.oracle') public dataSource: OracleDataSource,
    @repository(NotehisRepository)
    public notehisRepository: NotehisRepository,
  ) {}

  @post('/nodeapi/notehis', {
    responses: {
      '200': {
        description: 'Notehis model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notehis)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notehis, {
            title: 'NewNotehis',
            exclude: ['id'],
          }),
        },
      },
    })
    notehis: Omit<Notehis, 'id'>,
  ): Promise<Notehis> {
    return this.notehisRepository.create(notehis);
  }

  @get('/nodeapi/notehis/count', {
    responses: {
      '200': {
        description: 'Notehis model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Notehis) where?: Where<Notehis>,
  ): Promise<Count> {
    return this.notehisRepository.count(where);
  }

  @get('/nodeapi/notehis', {
    responses: {
      '200': {
        description: 'Array of Notehis model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Notehis, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Notehis) filter?: Filter<Notehis>,
  ): Promise<Notehis[]> {
    return this.notehisRepository.find(filter);
  }

  @patch('/nodeapi/notehis', {
    responses: {
      '200': {
        description: 'Notehis PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notehis, {partial: true}),
        },
      },
    })
    notehis: Notehis,
    @param.where(Notehis) where?: Where<Notehis>,
  ): Promise<Count> {
    return this.notehisRepository.updateAll(notehis, where);
  }

  @get('/nodeapi/notehis/{id}', {
    responses: {
      '200': {
        description: 'Notehis model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Notehis, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Notehis, {exclude: 'where'}) filter?: FilterExcludingWhere<Notehis>
  ): Promise<Notehis> {
    return this.notehisRepository.findById(id, filter);
  }

  @patch('/nodeapi/notehis/{id}', {
    responses: {
      '204': {
        description: 'Notehis PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notehis, {partial: true}),
        },
      },
    })
    notehis: Notehis,
  ): Promise<void> {
    await this.notehisRepository.updateById(id, notehis);
  }

  @put('/nodeapi/notehis/{id}', {
    responses: {
      '204': {
        description: 'Notehis PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() notehis: Notehis,
  ): Promise<void> {
    await this.notehisRepository.replaceById(id, notehis);
  }

  @del('/nodeapi/notehis/{id}', {
    responses: {
      '204': {
        description: 'Notehis DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.notehisRepository.deleteById(id);
  }

  //total notes
  @get('/nodeapi/notehis/total', {
    responses: {
      '200': spec,
    },
  })
  async totalnotes(
    @param.query.string('custnumber') custnumber: string,
  ): Promise<any> {
    var sql = "Select count(*) total from vallnotes where custnumber = '" + custnumber + "'";

    const data = await this.dataSource.execute(sql)
    return data
  }

  //custnotes
  @get('/nodeapi/notehis/custnotes', {
    responses: {
      '200': spec,
    },
  })
  async custnotes(
    @param.query.string('custnumber') custnumber: string,
    @param.query.string('offset') offset: number,
    @param.query.string('next') next: number,
  ): Promise<any> {
    var sql = "Select id,owner,custnumber,accnumber,to_char(notedate) notedate, notesrc,noteimp, notemade, reason from vallnotes where custnumber = '" + custnumber + "' offset " + offset + " rows fetch next " + next + " rows only";
    const data = await this.dataSource.execute(sql)
    return data
  }
}
