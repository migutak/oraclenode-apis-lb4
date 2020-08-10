import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'oracle',
  connector: 'oracle',
  tns: '',
  host: '52.117.93.88',
  port: 1521,
  user: 'ecol',
  password: 'ecol',
  database: 'ORCLCDB.localdomain'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class OracleDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'oracle';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.oracle', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
