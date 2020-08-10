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
import {TblAllocationsMemogroups} from '../models';
import {TblAllocateionsMemogroupsRepository} from '../repositories';

export class TblallocationsmemogroupController {
  constructor(
    @repository(TblAllocateionsMemogroupsRepository)
    public tblAllocateionsMemogroupsRepository: TblAllocateionsMemogroupsRepository,
  ) {}

  @post('/nodeapi/tbl_allocations_memogroups', {
    responses: {
      '200': {
        description: 'TblAllocateionsMemogroups model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblAllocationsMemogroups)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblAllocationsMemogroups, {
            title: 'NewTblAllocateionsMemogroups',

          }),
        },
      },
    })
    tblAllocateionsMemogroups: TblAllocationsMemogroups,
  ): Promise<TblAllocationsMemogroups> {
    return this.tblAllocateionsMemogroupsRepository.create(tblAllocateionsMemogroups);
  }

  @get('/nodeapi/tbl_allocations_memogroups/count', {
    responses: {
      '200': {
        description: 'TblAllocateionsMemogroups model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TblAllocationsMemogroups) where?: Where<TblAllocationsMemogroups>,
  ): Promise<Count> {
    return this.tblAllocateionsMemogroupsRepository.count(where);
  }

  @get('/nodeapi/tbl_allocations_memogroups', {
    responses: {
      '200': {
        description: 'Array of TblAllocateionsMemogroups model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TblAllocationsMemogroups, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TblAllocationsMemogroups) filter?: Filter<TblAllocationsMemogroups>,
  ): Promise<TblAllocationsMemogroups[]> {
    return this.tblAllocateionsMemogroupsRepository.find(filter);
  }

  @patch('/nodeapi/tbl_allocations_memogroups', {
    responses: {
      '200': {
        description: 'TblAllocateionsMemogroups PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblAllocationsMemogroups, {partial: true}),
        },
      },
    })
    tblAllocateionsMemogroups: TblAllocationsMemogroups,
    @param.where(TblAllocationsMemogroups) where?: Where<TblAllocationsMemogroups>,
  ): Promise<Count> {
    return this.tblAllocateionsMemogroupsRepository.updateAll(tblAllocateionsMemogroups, where);
  }

  @get('/nodeapi/tbl_allocations_memogroups/{id}', {
    responses: {
      '200': {
        description: 'TblAllocateionsMemogroups model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TblAllocationsMemogroups, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TblAllocationsMemogroups, {exclude: 'where'}) filter?: FilterExcludingWhere<TblAllocationsMemogroups>
  ): Promise<TblAllocationsMemogroups> {
    return this.tblAllocateionsMemogroupsRepository.findById(id, filter);
  }

  @patch('/nodeapi/tbl_allocations_memogroups/{id}', {
    responses: {
      '204': {
        description: 'TblAllocateionsMemogroups PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblAllocationsMemogroups, {partial: true}),
        },
      },
    })
    tblAllocateionsMemogroups: TblAllocationsMemogroups,
  ): Promise<void> {
    await this.tblAllocateionsMemogroupsRepository.updateById(id, tblAllocateionsMemogroups);
  }

  @put('/nodeapi/tbl_allocations_memogroups/{id}', {
    responses: {
      '204': {
        description: 'TblAllocateionsMemogroups PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tblAllocateionsMemogroups: TblAllocationsMemogroups,
  ): Promise<void> {
    await this.tblAllocateionsMemogroupsRepository.replaceById(id, tblAllocateionsMemogroups);
  }

  @del('/nodeapi/tbl_allocations_memogroups/{id}', {
    responses: {
      '204': {
        description: 'TblAllocateionsMemogroups DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tblAllocateionsMemogroupsRepository.deleteById(id);
  }
}
