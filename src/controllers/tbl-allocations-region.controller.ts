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
import {TblAllocationsRegion} from '../models';
import {TblAllocationsRegionRepository} from '../repositories';

export class TblAllocationsRegionController {
  constructor(
    @repository(TblAllocationsRegionRepository)
    public tblAllocationsRegionRepository: TblAllocationsRegionRepository,
  ) {}

  @post('/nodeapi/tbl-allocations-regions', {
    responses: {
      '200': {
        description: 'TblAllocationsRegion model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblAllocationsRegion)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblAllocationsRegion, {
            title: 'NewTblAllocationsRegion',

          }),
        },
      },
    })
    tblAllocationsRegion: TblAllocationsRegion,
  ): Promise<TblAllocationsRegion> {
    return this.tblAllocationsRegionRepository.create(tblAllocationsRegion);
  }

  @get('/nodeapi/tbl-allocations-regions/count', {
    responses: {
      '200': {
        description: 'TblAllocationsRegion model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TblAllocationsRegion) where?: Where<TblAllocationsRegion>,
  ): Promise<Count> {
    return this.tblAllocationsRegionRepository.count(where);
  }

  @get('/nodeapi/tbl-allocations-regions', {
    responses: {
      '200': {
        description: 'Array of TblAllocationsRegion model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TblAllocationsRegion, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TblAllocationsRegion) filter?: Filter<TblAllocationsRegion>,
  ): Promise<TblAllocationsRegion[]> {
    return this.tblAllocationsRegionRepository.find(filter);
  }

  @patch('/nodeapi/tbl-allocations-regions', {
    responses: {
      '200': {
        description: 'TblAllocationsRegion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblAllocationsRegion, {partial: true}),
        },
      },
    })
    tblAllocationsRegion: TblAllocationsRegion,
    @param.where(TblAllocationsRegion) where?: Where<TblAllocationsRegion>,
  ): Promise<Count> {
    return this.tblAllocationsRegionRepository.updateAll(tblAllocationsRegion, where);
  }

  @get('/nodeapi/tbl-allocations-regions/{id}', {
    responses: {
      '200': {
        description: 'TblAllocationsRegion model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TblAllocationsRegion, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TblAllocationsRegion, {exclude: 'where'}) filter?: FilterExcludingWhere<TblAllocationsRegion>
  ): Promise<TblAllocationsRegion> {
    return this.tblAllocationsRegionRepository.findById(id, filter);
  }

  @patch('/nodeapi/tbl-allocations-regions/{id}', {
    responses: {
      '204': {
        description: 'TblAllocationsRegion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblAllocationsRegion, {partial: true}),
        },
      },
    })
    tblAllocationsRegion: TblAllocationsRegion,
  ): Promise<void> {
    await this.tblAllocationsRegionRepository.updateById(id, tblAllocationsRegion);
  }

  @put('/nodeapi/tbl-allocations-regions/{id}', {
    responses: {
      '204': {
        description: 'TblAllocationsRegion PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tblAllocationsRegion: TblAllocationsRegion,
  ): Promise<void> {
    await this.tblAllocationsRegionRepository.replaceById(id, tblAllocationsRegion);
  }

  @del('/nodeapi/tbl-allocations-regions/{id}', {
    responses: {
      '204': {
        description: 'TblAllocationsRegion DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tblAllocationsRegionRepository.deleteById(id);
  }
}
