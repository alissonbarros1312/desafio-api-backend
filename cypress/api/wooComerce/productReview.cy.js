/// <reference types="cypress"/>
import productReviewSchema from '../../contratos/postProductReviewSchema'
import putProductReview from '../../contratos/putProductReviewSchema'
import deleteProductReview from '../../contratos/deleteProductReviewSchema'
import body from '../../fixtures/bodyProductReview.json'

describe('Product Review', ()=>{

    it('Create Product Review - Aceite', ()=>{
        cy.postProductReview().should((response)=>{
            expect(response.status).to.be.eq(201)
            expect(response.body.reviewer_email).to.be.equal(body.productReviewValido.reviewer_email)
            expect(response.body.product_id).to.equal(body.productReviewValido.product_id)
            expect(response.body.rating).to.equal(body.productReviewValido.rating)
        })
    })

    it('Create Product Review - Contrato', ()=>{
        cy.postProductReview().should((response)=>{
            return productReviewSchema.validateAsync(response.body) 
        })
    })

    it('Update Product Review - Aceite', ()=>{
        cy.postProductReview().should((response)=>{
            cy.putProductReview(response.body.id, 'João Souza').should((putResponse)=>{
                expect(putResponse.status).to.be.eq(200)
                expect(putResponse.body.reviewer).to.be.equal('João Souza')
                expect(response.body.reviewer_email).to.be.equal(body.productReviewValido.reviewer_email)
                expect(response.body.product_id).to.equal(body.productReviewValido.product_id)
                expect(response.body.rating).to.equal(body.productReviewValido.rating)
            })
        })
    })

    it('Update Product Review - Contrato', ()=>{
        cy.postProductReview().should((response)=>{
            cy.putProductReview(response.body.id, 'Maria Souza').should((putResponse)=>{
                return putProductReview.validateAsync(putResponse.body)
            })
        })
    })

    it('Delete Product Review - Aceite', ()=>{
        cy.postProductReview().should((response)=>{
            cy.deleteProductReview(response.body.id).should((deleteResponse)=>{
                expect(deleteResponse.status).to.be.eq(200)
                expect(deleteResponse.body.deleted).to.be.true
                expect(deleteResponse.body.previous).to.exist
                expect(deleteResponse.body.previous.reviewer_email).to.be.equal(body.productReviewValido.reviewer_email)
                expect(deleteResponse.body.previous.product_id).to.equal(body.productReviewValido.product_id)
            })
        })
    })
    
    it('Delete Product Review - Contrato', ()=>{
        cy.postProductReview().should((response)=>{
            cy.deleteProductReview(response.body.id).should((deleteResponse)=>{
                return deleteProductReview.validateAsync(deleteResponse.body)
            })
        })

    })


})