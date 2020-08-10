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
import {TblAllocationsDeptcodes} from '../models';
import {TblAllocationsDeptcodesRepository} from '../repositories';

export class TblAllocationsDeptcodesController {
  constructor(
    @repository(TblAllocationsDeptcodesRepository)
    public tblAllocationsDeptcodesRepository: TblAllocationsDeptcodesRepository,
  ) {}

  @post('/nodeapi/tbl-allocations-deptcodes', {
    responses: {
      '200': {
        description: 'TblAllocationsDeptcodes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblAllocationsDeptcodes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblAllocationsDeptcodes, {
            title: 'NewTblAllocationsDeptcodes',
            exclude: ['id'],
          }),
        },
      },
    })
    tblAllocationsDeptcodes: Omit<TblAllocationsDeptcodes, 'id'>,
  ): Promise<TblAllocationsDeptcodes> {
    return this.tblAllocationsDeptcodesRepository.create(tblAllocationsDeptcodes);
  }

  @get('/nodeapi/tbl-allocations-deptcodes/count', {
    responses: {
      '200': {
        description: 'TblAllocationsDeptcodes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TblAllocationsDeptcodes) where?: Where<TblAllocationsDeptcodes>,
  ): Promise<Count> {
    return this.tblAllocationsDeptcodesRepository.count(where);
  }

  @get('/nodeapi/tbl-allocations-deptcodes', {
    responses: {
      '200': {
        description: 'Array of TblAllocationsDeptcodes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TblAllocationsDeptcodes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TblAllocationsDeptcodes) filter?: Filter<TblAllocationsDeptcodes>,
  ): Promise<TblAllocationsDeptcodes[]> {
    return this.tblAllocationsDeptcodesRepository.find(filter);
  }

  @patch('/nodeapi/tbl-allocations-deptcodes', {
    responses: {
      '200': {
        description: 'TblAllocationsDeptcodes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblAllocationsDeptcodes, {partial: true}),
        },
      },
    })
    tblAllocationsDeptcodes: TblAllocationsDeptcodes,
    @param.where(TblAllocationsDeptcodes) where?: Where<TblAllocationsDeptcodes>,
  ): Promise<Count> {
    return this.tblAllocationsDeptcodesRepository.updateAll(tblAllocationsDeptcodes, where);
  }

  @get('/nodeapi/tbl-allocations-deptcodes/{id}', {
    responses: {
      '200': {
        description: 'TblAllocationsDeptcodes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TblAllocationsDeptcodes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TblAllocationsDeptcodes, {exclude: 'where'}) filter?: FilterExcludingWhere<TblAllocationsDeptcodes>
  ): Promise<TblAllocationsDeptcodes> {
    return this.tblAllocationsDeptcodesRepository.findById(id, filter);
  }

  @patch('/nodeapi/tbl-allocations-deptcodes/{id}', {
    responses: {
      '204': {
        description: 'TblAllocationsDeptcodes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblAllocationsDeptcodes, {partial: true}),
        },
      },
    })
    tblAllocationsDeptcodes: TblAllocationsDeptcodes,
  ): Promise<void> {
    await this.tblAllocationsDeptcodesRepository.updateById(id, tblAllocationsDeptcodes);
  }

  @put('/nodeapi/tbl-allocations-deptcodes/{id}', {
    responses: {
      '204': {
        description: 'TblAllocationsDeptcodes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tblAllocationsDeptcodes: TblAllocationsDeptcodes,
  ): Promise<void> {
    await this.tblAllocationsDeptcodesRepository.replaceById(id, tblAllocationsDeptcodes);
  }

  @del('/nodeapi/tbl-allocations-deptcodes/{id}', {
    responses: {
      '204': {
        description: 'TblAllocationsDeptcodes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tblAllocationsDeptcodesRepository.deleteById(id);
  }
}
