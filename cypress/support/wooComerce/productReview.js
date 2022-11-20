/// <reference types="cypress"/>
import header from  '../../fixtures/headerProductReview.json'
import { faker } from '@faker-js/faker'
import body from '../../fixtures/bodyProductReview.json'

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

    Cypress.Commands.add('putProductReview', (id, reviewer)=>{
        cy.request({
            method: 'PUT',
            url: Cypress.config('baseUrl') + Cypress.env('urlProductReview') + `${id}`,
            headers: {
                Authorization: header.token,
                ContentType: header.ContentType
            },    
            body:{
                "reviewer": reviewer
            }  

        })
    })

    Cypress.Commands.add('deleteProductReview', (id)=>{
        cy.request({
            method: 'DELETE',
            url: Cypress.config('baseUrl') + Cypress.env('urlProductReview') + `${id}?force=true`,
            headers:{
                Authorization: header.token,
                ContentType: header.ContentType
            }
        })
    })
})