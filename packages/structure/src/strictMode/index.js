const Errors = require('../errors');
const DefaultValidationError = require('../errors/DefaultValidationError');

exports.for = function strictModeFor(schema, StructureClass) {
  const StructureValidationError =
    schema.options.strictValidationErrorClass || DefaultValidationError;

  return {
    buildStrict(...constructorArgs) {
      const instance = new StructureClass(...constructorArgs);

      const { valid, errors } = instance.validate();

      if (!valid) {
        throw Errors.invalidAttributes(errors, StructureValidationError);
      }

      return instance;
    },
  };
};
