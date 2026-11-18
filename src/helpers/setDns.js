import dns from 'dns';

export const setDns = () => {
    dns.setServers([
        '8.8.8.8',
        '8.8.4.4'
    ]);
}