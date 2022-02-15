const router = require('express').Router();
const Accounts = require('./accounts-model');

const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.json(accounts);
    })
    .catch(next);
});

router.get('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;
  Accounts.getById(id)
    .then(account => {
      res.json(account);
    })
    .catch(next);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create({ name: req.name.trim(), budget: req.budget });
    res.status(201).json(newAccount);
  } catch(err) {
    next(err);
  }
});

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  const { id } = req.params;
  Accounts.updateById(id, req.body)
    .then(updatedAccount => {
      res.status(200).json(updatedAccount);
    })
    .catch(next);
});

router.delete('/:id', checkAccountId, (req, res, next) => {
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
