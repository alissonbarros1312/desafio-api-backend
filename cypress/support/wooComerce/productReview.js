/// <reference types="cypress"/>
import header from  '../../fixtures/productReview/headerProductReview.json'
import body from '../../fixtures/productReview/bodyProductReview.json'

Cypress.Commands.add('postProductReview', (review, reviewerEmail)=>{
    cy.request({
        method: 'POST',
        url: Cypress.config('baseUrl') + Cypress.env('urlProductReview'),
        headers: {
            Authorization: header.token,
            ContentType: header.ContentType
        }, 
        body: {
            "product_id": body.productReviewValido.product_id,
            "review": review,
            "reviewer": body.productReviewValido.reviewer,
            "reviewer_email": reviewerEmail,
            "rating": body.productReviewValido.rating
        }
    })

    Cypress.Commands.add('putProductReview', (id, reviewer, rating)=>{
        cy.request({
            method: 'PUT',
            url: Cypress.config('baseUrl') + Cypress.env('urlProductReview') + `${id}`,
            headers: {
                Authorization: header.token,
                ContentType: header.ContentType
            },    
            body:{
                "reviewer": reviewer,
                "rating": rating
            }  

        })
    })

    Cypress.Commands.add('deleteProductReview', (id, force)=>{
        cy.request({
            method: 'DELETE',
            url: Cypress.config('baseUrl') + Cypress.env('urlProductReview') + `${id}?force=${force}`,
            headers:{
                Authorization: header.token,
                ContentType: header.ContentType
            }
        })
    })
})