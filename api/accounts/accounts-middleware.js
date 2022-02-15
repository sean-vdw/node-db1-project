const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number" || isNaN(budget)) {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" });
  } else {
    req.name = name;
    req.budget = budget;
    next();
  };
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;
  try {
    const accountName = await Accounts.getByName(name);
    if (accountName) {
      res.status(400).json({ message: "that name is taken" });
    } else {
      req.name = name;
      next();
    }
  } catch(err) {
    res.status(500).json({ message: "Could not get account name" });
  }
};

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await Accounts.getById(id);
    if (!account) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch(err) {
    next(err);
  }
};
