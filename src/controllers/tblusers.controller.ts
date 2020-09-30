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
import {Tblusers} from '../models';
import {TblusersRepository} from '../repositories';


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

export class TblusersController {

  constructor(
    @inject('datasources.oracle') public dataSource: OracleDataSource,
    @repository(TblusersRepository)
    public tblusersRepository: TblusersRepository,
  ) {}

  @post('/nodeapi/tblusers', {
    responses: {
      '200': {
        description: 'Tblusers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tblusers)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tblusers, {
            title: 'NewTblusers',

          }),
        },
      },
    })
    tblusers: Tblusers,
  ): Promise<Tblusers> {
    return this.tblusersRepository.create(tblusers);
  }

  @get('/nodeapi/tblusers/count', {
    responses: {
      '200': {
        description: 'Tblusers model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Tblusers) where?: Where<Tblusers>,
  ): Promise<Count> {
    return this.tblusersRepository.count(where);
  }

  @get('/nodeapi/tblusers', {
    responses: {
      '200': {
        description: 'Array of Tblusers model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Tblusers, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Tblusers) filter?: Filter<Tblusers>,
  ): Promise<Tblusers[]> {
    return this.tblusersRepository.find(filter);
  }

  @patch('/nodeapi/tblusers', {
    responses: {
      '200': {
        description: 'Tblusers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tblusers, {partial: true}),
        },
      },
    })
    tblusers: Tblusers,
    @param.where(Tblusers) where?: Where<Tblusers>,
  ): Promise<Count> {
    return this.tblusersRepository.updateAll(tblusers, where);
  }

  @get('/nodeapi/tblusers/{id}', {
    responses: {
      '200': {
        description: 'Tblusers model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tblusers, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tblusers, {exclude: 'where'}) filter?: FilterExcludingWhere<Tblusers>
  ): Promise<Tblusers> {
    return this.tblusersRepository.findById(id, filter);
  }

  @patch('/nodeapi/tblusers/{id}', {
    responses: {
      '204': {
        description: 'Tblusers PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tblusers, {partial: true}),
        },
      },
    })
    tblusers: Tblusers,
  ): Promise<void> {
    await this.tblusersRepository.updateById(id, tblusers);
  }

  @put('/nodeapi/tblusers/{id}', {
    responses: {
      '204': {
        description: 'Tblusers PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tblusers: Tblusers,
  ): Promise<void> {
    await this.tblusersRepository.replaceById(id, tblusers);
  }

  @del('/nodeapi/tblusers/{id}', {
    responses: {
      '204': {
        description: 'Tblusers DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tblusersRepository.deleteById(id);
  }

  //login
  @get('/nodeapi/tblusers/login/{username}', {
    responses: {
      '200': spec,
    },
  })
  async login(
    @param.path.string('username') username: string,
  ): Promise<any> {
    var sql = "select * from tblusers where lower(username)= '" + username.toLowerCase() + "'";

    const data = await this.dataSource.execute(sql)
    return {
      message: "success",
      data: data
    };
  }
}
