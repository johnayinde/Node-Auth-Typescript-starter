import Joi from 'joi';

const validatePost = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});

export { validatePost };
