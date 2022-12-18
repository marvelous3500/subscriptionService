import Joi from 'joi'


export const validateSubscription = Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(30).required(),
    type: Joi.string().alphanum().min(2).max(30).required(),
    subsctiption_start: Joi.string().alphanum().min(2).max(30).required(),
    subsctiption_end: Joi.string().alphanum().min(2).max(30).required(),
    discription: Joi.string().alphanum().min(2).max(30).required()
  })