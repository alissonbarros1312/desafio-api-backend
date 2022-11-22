/// <reference types="cypress"/>
import productReviewSchema from '../../contratos/postProductReviewSchema'
import putProductReviewSchema from '../../contratos/putProductReviewSchema'
import deleteProductReviewSchema from '../../contratos/deleteProductReviewSchema'
import body from '../../fixtures/productReview/bodyProductReview.json'
import parameterJson from '../../fixtures/productReview/parameter.json'
import { faker } from '@faker-js/faker'

describe('Product Review', () => {

    it('Create Product Review', () => {
        var reviewFaker = faker.music.songName()
        var reviewerEmailFaker = faker.internet.email()
        cy.postProductReview(reviewFaker, reviewerEmailFaker).should((response) => {
            expect(response.status).to.be.eq(201)
            expect(response.body.product_id).to.equal(body.productReviewValido.product_id)
            expect(response.body.review).to.equal(reviewFaker)
            expect(response.body.reviewer).to.equal(body.productReviewValido.reviewer)
            expect(response.body.reviewer_email).to.be.equal(reviewerEmailFaker)
            expect(response.body.rating).to.equal(body.productReviewValido.rating)
            productReviewSchema.validateAsync(response.body)
            cy.deleteProductReview(response.body.id, parameterJson.force).should(({ status }) => {
                expect(status).to.eq(200)
            })
        })
    })

    it('Update Product Review', () => {
        var review = faker.music.songName()
        var reviewerEmail = faker.internet.email()
        var atualizarReviewer = faker.name.fullName()

        cy.postProductReview(review, reviewerEmail).should((response) => {
            cy.putProductReview(response.body.id, atualizarReviewer).should((putResponse) => {
                expect(putResponse.status).to.be.eq(200)
                expect(putResponse.body.product_id).to.equal(body.productReviewValido.product_id)
                expect(putResponse.body.review).to.equal(review)
                expect(putResponse.body.reviewer).to.be.equal(atualizarReviewer)
                expect(putResponse.body.reviewer_email).to.be.equal(reviewerEmail)
                expect(putResponse.body.rating).to.equal(body.productReviewValido.rating)
                putProductReviewSchema.validateAsync(putResponse.body),
                    cy.deleteProductReview(response.body.id, parameterJson.force).should(({ status }) => {
                        expect(status).to.eq(200)
                    })
            })
        })
    })

    it.only('Delete Product Review', () => {
        var reviewFaker = faker.music.songName()
        var reviewerEmailFaker = faker.internet.email()
        cy.postProductReview(reviewFaker, reviewerEmailFaker).should((postResponse) => {
            cy.deleteProductReview(postResponse.body.id, parameterJson.force).should((deleteResponse) => {
                expect(deleteResponse.status).to.be.eq(200)
                expect(deleteResponse.body.deleted).to.be.true
                expect(deleteResponse.body.previous).to.exist
                expect(deleteResponse.body.previous.product_id).to.equal(postResponse.body.product_id)
                expect(deleteResponse.body.previous.review).to.equal(reviewFaker)
                expect(deleteResponse.body.previous.reviewer).to.equal(postResponse.body.reviewer)
                expect(deleteResponse.body.previous.reviewer_email).to.be.equal(reviewerEmailFaker)
                expect(deleteResponse.body.previous.rating).to.equal(postResponse.body.rating)

                deleteProductReviewSchema.validateAsync(deleteResponse.body)
            })
        })
    })

})