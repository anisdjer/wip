module.exports = class ModelRoute {
    constructor(repository, serializer) {
        this.repository = repository;
        this.serializer = serializer;
    }

    getAll(req, res, next) {
        this.repository.findAll()
            .then(users => {
                if (users !== null) {
                    res.json(this.serializer.serialize(users))
                } else {
                    res.status(404).end()
                }
            })
            .catch(() => res.status(400).end())
    }

    getOne(req, res, next) {
        this.repository.findOne({ where: {id: req.params.id}})
            .then(user => {
                if (user) {
                    res.json(this.serializer.serialize(user))
                } else {
                    res.status(404).json(this.serializer.error({status: 404}))
                }
            })
            .catch(() => res.status(400).json(this.serializer.error({status: 400})))
    }

    create(req, res, next) {
        let user = req.body;
        user.id = undefined;

        this.repository.create(user)
            .then(user => res.json(this.serializer.serialize(user)))
            .catch(() => res.status(400).json(this.serializer.error({status: 400})))
    }

    update(req, res, next) {
        let newUser = req.body;
        newUser.id = undefined;

        this.repository.findOne({ where: {id: req.params.id}})
            .then(user => {
                if (user) {
                    user.updateAttributes(this.serializer.serialize(newUser));
                    res.json(user);
                } else {
                    res.status(404).end();
                }
            })
            .catch(() => res.status(400).end())
    }

    delete(req, res, next) {
        this.repository.findOne({ where: {id: req.params.id}})
            .then(user => {
                if (user) {
                    user.destroy(this.serializer.serialize(user));
                    res.status(204).json();
                } else {
                    res.status(404).end();
                }
            })
            .catch(() => res.status(400).end())
    }
}
