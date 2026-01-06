//this is a middle ware to run the joi schemas we define it in the validation folder

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message:"THERE IS AN ERROR IN MAKING THE TODO VALIDATION MIDDLEWARE" });
    }

    next();//go to the next which is possibly the auth middleware
  };
};

module.exports = validate;