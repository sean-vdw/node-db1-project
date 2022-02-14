const router = require('express').Router();
const Accounts = require('./accounts-model');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.json(accounts);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params.id;
  Accounts.getById(id)
    .then(account => {
      res.json(account);
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
  Accounts.create(req.body)
    .then(newAccount => {
      res.status(201).json(newAccount);
    })
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  Accounts.updateById(id, req.body)
    .then(updatedAccount => {
      res.status(200).json(updatedAccount);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Accounts.deleteById(id)
    .then(delAccount => {
      res.json(delAccount);
    })
    .catch(next);
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
