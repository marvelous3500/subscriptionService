import Joi from 'joi'

export const validatePlan = Joi.object().keys({
  name: Joi.string().alphanum().min(2).max(30).required(),
  price: Joi.string().alphanum().min(2).max(30).required()

})