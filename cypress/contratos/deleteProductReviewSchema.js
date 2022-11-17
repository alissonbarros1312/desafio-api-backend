import Joi from "joi";

const deleteProductReview = Joi.object({

    deleted: Joi.boolean().required(),
    previous: Joi.object({
        id: Joi.number().required(),
        date_created: Joi.date().required(),
        date_created_gmt: Joi.date().required(),
        product_id: Joi.number().required(),
        product_name: Joi.string().required(),
        product_permalink: Joi.string().required(),
        status: Joi.string().required(),
        reviewer: Joi.string().required(),
        reviewer_email: Joi.string().required(),
        review: Joi.string().required(),
        rating: Joi.number().required(),
        verified: Joi.boolean().required(),
        reviewer_avatar_urls: Joi.object({
            24: Joi.string().required(),
            48: Joi.string().required(),
            96: Joi.string().required()
        }).required()
    }).required()
}).required()

export default deleteProductReview