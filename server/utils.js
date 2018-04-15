function es6BindAll(context, methodNames) {
    methodNames.map(function(methodName) {
        context[methodName] = context[methodName].bind(context);
    });

    return context;
};

module.exports.repositoryBinding = function repositoryBinding(repository) {
    return es6BindAll(repository, ['getAll', 'getOne', 'create', 'update', 'delete'])
};