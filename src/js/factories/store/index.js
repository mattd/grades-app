import { isDev } from 'utils/environment';

if (isDev()) {
    module.exports = require('./dev');
} else {
    module.exports = require('./prod');
}