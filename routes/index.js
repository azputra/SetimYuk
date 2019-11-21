"use strict"

const emailSend = require('../helper/mailThanks')
const checkPassword = require('../helper/checkPassword')
const express = require('express')
const routes = require('express').Router()

//panggil model
const Customer = require('../models').Customer
const Product = require('../models').Product
const LaundressCar = require('../models').LaundressCar
const ProductCustomer = require('../models').ProductCustomer

routes.use(express.json())
routes.use(express.urlencoded({ extended: true }))



// //=================SESSION & MIDDLEWARE========================
// const loginMiddlewareSession = (req, res, next) => {

//     if (req.session.laundree && req.session.laundree.id) {
//         next()
//     } else {
//         res.redirect('/')
//     }
// }

//=====================LAUNDRESS =============


//LOGIN
routes.get('/', (req, res) => {
    res.render('index')
})

routes.post('/', (req, res) => {
    // res.send(inputPass)
    LaundressCar.findOne({
        where: {
            username: req.body.username,
        }
    })
        .then((laundree) => {
            let inputPass = checkPassword(req.body.password, laundree.password)
            // res.send(inputPass)
            if (!inputPass)
                res.redirect('/')
            else {
                // res.send(laundree)
                res.redirect('/customers')
            }
        })
        .catch((err) => {
            res.send(err.message)
        });
})

//REGISTER
routes.get('/laundress/register', (req, res) => {
    res.render('register')
})

routes.post('/laundress/register', (req, res) => {
    LaundressCar.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    })
        .then(() => {
            LaundressCar.findOne({
                where: {
                    firstName: req.body.firstName
                }
            })
                .then(() => {
                    res.redirect('/')
                })
        }).catch((err) => {
            res.send(err)
        })
})


//================================CUSTOMERS============================
//READ
routes.get('/customers', (req, res) => {
    Customer.findAll()
        .then((customers) => {
            res.render('showCustomers', { customers })
        }).catch((err) => {
            res.send(err.message)
        });
})

//CREATE
routes.get('/customers/add', (req, res) => {
    res.render('addCustomer')
})

routes.post('/customers/add', (req, res) => {
    Customer.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        platNo: req.body.platNo,
        email: req.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then(() => { res.redirect('/customers') })
        .catch((err) => { res.send(err.message) })
})

//EDIT
routes.get('/customers/edit/:id', (req, res) => {
    Customer.findByPk(req.params.id)
        .then(customer => {
            res.render('editCustomer', { customer })
        })
        .catch(err => {
            res.send(err.message)
        })
})

routes.post('/customers/edit/:id', (req, res) => {
    let update = {}
    for (const key in req.body) {
        if (req.body[key].length > 0) {
            update[key] = req.body[key]
        }
    }
    Customer.update(update, { where: { id: req.params.id } })
        .then(() => { res.redirect('/customers') })
        .catch((err) => { res.send(err.message) })
})

//DELETE
routes.get('/customers/delete/:id', (req, res) => {
    Customer.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.redirect("/customers")
        })
        .catch((err) => { res.send(err.message) })
})

//MToM ADD PRODUCT
routes.get('/customers/:id/add-product', (req, res) => {
    const checkId = req.params.id
    let products = []
    Product.findAll()
        .then(product => {
            products = product
        })
    Customer.findByPk(checkId)
        .then(customer => {
            // res.send(customer)
            emailSend(customer.email)
            res.render("customerAddProducts", { customer, products })
        })
        .catch(err => {
            res.send(err.message)
        })
})

routes.post('/customers/:id/add-product', (req, res) => {
    ProductCustomer.create({
        CustomerId: req.body.CustomerId,
        ProductId: req.body.ProductId
    })
        .then(() => {
            res.redirect('/customers')
        })
        .catch(err => { res.send(err.message) })
})

//CHECK CUST PRODUCT
routes.get('/customers/:id/history', (req, res) => {
    let customerArr = []
    Customer.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(customer => {
            customerArr = customer
            return customer.getProducts()
        })
        .then(products => {
            res.render('customerHistory', { customerArr, products })
        })
        .catch(err => {
            res.send(err)
        })
})



//========================PRODUCT==================================
//READ
routes.get('/products', (req, res) => {
    Product.findAll()
        .then((products) => {
            // res.send(products)
            res.render('showProducts', { products })
        }).catch((err) => {
            res.send(err.message)
        });
})

//ADD
routes.get('/products/add', (req, res) => {
    res.render('addProduct')
})

routes.post('/products/add', (req, res) => {
    Product.create({
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then(() => { res.redirect('/products') })
        .catch((err) => { res.send(err.message) })
})

//EDIT
routes.get('/products/edit/:id', (req, res) => {
    Product.findByPk(req.params.id)
        .then(product => {
            res.render('editProduct', { product })
        })
        .catch(err => {
            res.send(err.message)
        })
})

routes.post('/products/edit/:id', (req, res) => {
    let update = {}
    for (const key in req.body) {
        if (req.body[key].length > 0) {
            update[key] = req.body[key]
        }
    }
    Product.update(update, { where: { id: req.params.id } })
        .then(() => { res.redirect('/products') })
        .catch((err) => { res.send(err.message) })
})

//DELETE
routes.get('/products/delete/:id', (req, res) => {
    Product.destroy({
        where: { id: req.params.id }
    })
        .then(() => { res.redirect("/products") })
        .catch((err) => { res.send(err.message) })
})



module.exports = routes