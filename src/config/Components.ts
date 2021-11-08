import { Globals } from './Globals';
import * as configUtil from './configUtil';
import { IPCountryServer } from '../web/server';
import { CountryRouter } from '../api/router/countryRouter';
import { IpstackClient } from '../vendor/ipstackClient';
import { LoadBalancer } from '../loadBalancer/loadBalancer';
import { CountryHandler } from '../api/handler/countryHandler';
import { IpapiClient } from '../vendor/ipapiClient';
import { MetricsRouter } from '../api/router/metricRouter';
import { MetricsHandler } from '../api/handler/metricHandler';

const globals = configUtil.get<Globals>('globals');

const webServerPortConfig = (): string => {
  return globals.port;
};

const ipstackClient = new IpstackClient(globals.ipstack.api, globals.ipstack.accessKey);

const ipapiClient = new IpapiClient(globals.ipapi.api);

const loadBalancer = new LoadBalancer(ipstackClient, ipapiClient);

const countryHandler = new CountryHandler(loadBalancer);

const countryRouterConfig = new CountryRouter(countryHandler);

const metricsHandler = new MetricsHandler(ipstackClient, ipapiClient);

const metricsRouterConfig = new MetricsRouter(metricsHandler);

const webServerConfig = (): IPCountryServer => {
  return new IPCountryServer(
    globals.port,
    countryRouterConfig,
    metricsRouterConfig,
  );
};

export {
  webServerConfig,
  webServerPortConfig,
  globals
};
