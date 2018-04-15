const ModelRoute = require('./model-route');
const {repositoryBinding} = require('../../utils')
const {userRepository} = require('../repositories');
const {userSerializer} = require('../serializers');

module.exports.user = repositoryBinding(new ModelRoute(userRepository, userSerializer));
