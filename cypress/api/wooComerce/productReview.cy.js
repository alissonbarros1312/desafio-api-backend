/// <reference types="cypress"/>
import postProductReviewSchema from '../../contratos/postProductReviewSchema'
import putProductReviewSchema from '../../contratos/putProductReviewSchema'
import deleteProductReviewSchema from '../../contratos/deleteProductReviewSchema'
import bodyJson from '../../fixtures/productReview/bodyProductReview.json'
import parameterJson from '../../fixtures/productReview/parameter.json'
import { faker } from '@faker-js/faker'

describe('Product Review', () => {

    it('Create Product Review', () => {
        var reviewFaker = faker.music.songName()
        var reviewerEmailFaker = faker.internet.email()
        cy.postProductReview(reviewFaker, reviewerEmailFaker).should(({ body, status }) => {

            expect(status).to.be.eq(201)
            expect(body.product_id).to.equal(bodyJson.productReviewValido.product_id)
            expect(body.review).to.equal(reviewFaker)
            expect(body.reviewer).to.equal(bodyJson.productReviewValido.reviewer)
            expect(body.reviewer_email).to.be.equal(reviewerEmailFaker)
            expect(body.rating).to.equal(bodyJson.productReviewValido.rating)

            postProductReviewSchema.validateAsync(body)
            cy.deleteProductReview(body.id, parameterJson.force).should(({ status }) => {
                expect(status).to.eq(200)
            })
        })
    })

    it('Update Product Review', () => {
        var reviewFaker = faker.music.songName()
        var reviewerEmailFaker = faker.internet.email()
        var atualizarReviewerFaker = faker.name.fullName()

        cy.postProductReview(reviewFaker, reviewerEmailFaker).should((response) => {
            cy.putProductReview(response.body.id, atualizarReviewerFaker).should(({ body, status }) => {
                expect(status).to.be.eq(200)
                expect(body.product_id).to.equal(bodyJson.productReviewValido.product_id)
                expect(body.review).to.equal(reviewFaker)
                expect(body.reviewer).to.be.equal(atualizarReviewerFaker)
                expect(body.reviewer_email).to.be.equal(reviewerEmailFaker)
                expect(body.rating).to.equal(bodyJson.productReviewValido.rating)
                putProductReviewSchema.validateAsync(body)
                cy.deleteProductReview(body.id, parameterJson.force).should(({ status }) => {
                    expect(status).to.eq(200)
                })
            })
        })
    })

    it('Delete Product Review', () => {
        var reviewFaker = faker.music.songName()
        var reviewerEmailFaker = faker.internet.email()
        cy.postProductReview(reviewFaker, reviewerEmailFaker).should((postResponse) => {
            cy.deleteProductReview(postResponse.body.id, parameterJson.force).should(({ body, status }) => {
                expect(status).to.be.eq(200)
                expect(body.deleted).to.be.true
                expect(body.previous.product_id).to.equal(postResponse.body.product_id)
                expect(body.previous.review).to.equal(reviewFaker)
                expect(body.previous.reviewer).to.equal(postResponse.body.reviewer)
                expect(body.previous.reviewer_email).to.be.equal(reviewerEmailFaker)
                expect(body.previous.rating).to.equal(postResponse.body.rating)

                return deleteProductReviewSchema.validateAsync(body)
            })
        })
    })

})