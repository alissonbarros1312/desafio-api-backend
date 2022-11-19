/// <reference types="cypress"/>
import productReviewSchema from '../../contratos/postProductReviewSchema'
import putProductReview from '../../contratos/putProductReviewSchema'
import deleteProductReview from '../../contratos/deleteProductReviewSchema'
import body from '../../fixtures/bodyProductReview.json'

describe('Product Review', () => {

    it('Create Product Review', () => {
        cy.postProductReview().should((response) => {
            expect(response.status).to.be.eq(201)
            expect(response.body.reviewer_email).to.be.equal(body.productReviewValido.reviewer_email)
            expect(response.body.product_id).to.equal(body.productReviewValido.product_id)
            expect(response.body.rating).to.equal(body.productReviewValido.rating)
            productReviewSchema.validateAsync(response.body)
            cy.deleteProductReview(response.body.id)
        })
    })

    it('Update Product Review', () => {
        var atualizarNome = 'João Souza'
        cy.postProductReview().should((response) => {
            cy.putProductReview(response.body.id, atualizarNome).should((putResponse) => {
                expect(putResponse.status).to.be.eq(200)
                expect(putResponse.body.reviewer).to.be.equal(atualizarNome)
                expect(response.body.reviewer_email).to.be.equal(body.productReviewValido.reviewer_email)
                expect(response.body.product_id).to.equal(body.productReviewValido.product_id)
                expect(response.body.rating).to.equal(body.productReviewValido.rating)
                putProductReview.validateAsync(putResponse.body),
                    cy.deleteProductReview(response.body.id)
            })
        })
    })

    it.only('Delete Product Review', () => {
        cy.postProductReview().should((response) => {
            cy.deleteProductReview(response.body.id).should((deleteResponse) => {
                expect(deleteResponse.status).to.be.eq(200)
                expect(deleteResponse.body.deleted).to.be.true
                expect(deleteResponse.body.previous).to.exist
                expect(deleteResponse.body.previous.reviewer_email).to.be.equal(body.productReviewValido.reviewer_email)
                expect(deleteResponse.body.previous.product_id).to.equal(body.productReviewValido.product_id)
                deleteProductReview.validateAsync(deleteResponse.body)
            })
        })
    })

})