import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {OracleDataSource} from './datasources';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class OraclenodeApisLb4Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set datasource based off environment
    const db_host = process.env.DB_HOST || '127.0.0.1';
    const db_port = process.env.DB_PORT || 1564;
    const db_user = process.env.DB_USERNAME || 'ecol';
    const db_pass = process.env.DB_PASSWORD || 'ecol';
    const database = process.env.DB_DATABASE || 'ORCLCDB.localdomain';

    this.bind('datasources.config.oracle').to({
      name: 'oracle',
      connector: 'oracle',
      url: '',
      host: db_host,
      port: db_port,
      user: db_user,
      password: db_pass,
      database: database,
      useNewUrlParser: true,
    });
    this.bind('datasources.oracle').toClass(OracleDataSource);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
