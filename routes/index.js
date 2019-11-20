"use strict"

const express = require('express')
const routes = require('express').Router()

//panggil model
const Customer = require('../models').Customer
const Product = require('../models').Product
const ProductCustomer = require('../models').ProductCustomer

routes.use(express.json())
routes.use(express.urlencoded({ extended: true }))


routes.get('/', (req, res) => {
    res.render('index')
})

//CUSTOMERS
//READ
routes.get('/customers', (req, res) => {
    Customer.findAll()
        .then((customers) => {
            // res.send(customers)
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
            // res.send(customer)
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
        .then(() => { res.redirect("/customers") })
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
    // Customer.findOne({
    //     where: {
    //         id: req.params.id
    //     },
    //     include: Product,
    //     plain: false
    // })
    //     .then(dataCustomers => {
    //         res.send(dataCustomers)
    //         res.render('showProductCustomer', { dataCustomers })
    //     })
    //     .catch(err => { res.send(err) })
    let cek = []
    Customer.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(customer => {
            // cek = customer
            return customer.getProducts()
        })
        .then(products => {

            res.send(products)

        })
        .catch(err => {
            res.send(err)
        })
})

//PRODUCT
//READ
routes.get('/products', (req, res) => {
    Product.findAll()
        .then((products) => {
            // res.send(Products)
            res.render('showProducts', { products })
        }).catch((err) => {
            res.send(err.message)
        });
})

//CREATE
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