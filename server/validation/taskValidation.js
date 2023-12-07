import Joi from "joi";

const taskValidation = Joi.object({
  type: Joi.string().valid("personal", "work", "shopping", "other").required(),
  title: Joi.string().required(),
  status: Joi.string().valid("todo", "in-progress", "done").default("todo"),
});

export default taskValidation;
