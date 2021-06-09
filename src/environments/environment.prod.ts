import ServiceName from './service-name';

export const environment = {
    production: true,
    apiUrl: 'http://utopia-load-balancer-1166047770.us-east-2.elb.amazonaws.com',
    getApiUrl: (serviceName: ServiceName) => {
        return 'http://utopia-load-balancer-1166047770.us-east-2.elb.amazonaws.com';
    }
};
