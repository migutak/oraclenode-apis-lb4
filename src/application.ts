import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
// import {MetricsComponent} from '@loopback/metrics';
import {RepositoryMixin} from '@loopback/repository';
import {Request, Response, RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import morgan from 'morgan';
import path from 'path';
import {OracleDataSource} from './datasources';
import {MySequence} from './sequence';
const ecsFormat = require('@elastic/ecs-morgan-format')

export {ApplicationConfig};

export class OraclenodeApisLb4Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    // this.component(MetricsComponent);
    // Set datasource based off environment
    const db_host = process.env.DB_HOST ?? '52.117.54.217';
    const db_port = process.env.DB_PORT ?? 1521;
    const db_user = process.env.DB_USERNAME ?? 'ecol';
    const db_pass = process.env.DB_PASSWORD ?? 'ecol';
    const database = process.env.DB_DATABASE ?? 'ORCLCDB.localdomain';

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
    this.setupLogging();
  }
  private setupLogging() {
    // Register `morgan` express middleware
    // Create a middleware factory wrapper for `morgan(format, options)`
    const morganFactory = (config?: morgan.Options<Request, Response>) => {
      this.debug('Morgan configuration', config);
      return morgan(ecsFormat(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms :total-time ms :url'), config);
    };

    // Print out logs using `debug`
    const defaultConfig: morgan.Options<Request, Response> = {};
    this.expressMiddleware(morganFactory, defaultConfig, {
      injectConfiguration: 'watch',
      key: 'middleware.morgan',
    });
  }
}
