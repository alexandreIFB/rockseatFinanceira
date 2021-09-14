const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

const customers = []


function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf, authorization } = request.headers

    if (!authorization) return response.json({ error: 'unauthorized' }).status(401)

    const customer = customers.find((customer) => customer.cpf === cpf)

    if (!customer) return response.json({ error: 'Customer not found' }).status(404)

    request.customer = customer

    return next();
}

function getBalance(customerStatement) {

    const saldo = customerStatement.reduce((acc, operador) => {
        if (operador.type === 'credit') {
            return acc + operador.amount
        }

        return acc - operador.amount
    }, 0)

    return saldo
}

app.use(express.json())


app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request

    return response.json(customer).status(201)
})

app.post('/account', (request, response) => {
    const { name, cpf } = request.body

    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)

    if (customerAlreadyExists) return response.json({ error: 'Customer already exists' }).status(400)

    const customer = {
        id: uuidv4(),
        name,
        cpf,
        statement: []
    }

    customers.push(customer)

    return response.json(customer).status(201)
})

app.put('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request
    const { name } = request.body

    customer.name = name

    return response.json(customer).status(201)
})

app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request

    customers.split(customer, 1)

    return response.json(customer).status(201)
})


app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request

    return response.json(customer.statement)
})

app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request

    const { date } = request.query

    const dateFormat = new Date(date + " 00:00")

    const statementsDate = customer.statement.filter((statement) =>
        statement.created_at.toDateString()
        ===
        new Date(dateFormat).toDateString())

    return response.json(statementsDate)
})

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request

    const { description, amount } = request.body

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    }

    customer.statement.push(statementOperation)

    return response.json(customer.statement)
})


app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request

    const { description, amount } = request.body



    const saldo = getBalance(customer.statement)

    console.log(saldo)

    if (amount > saldo) return response.json({ error: 'Insufficiente funds' }).status(400)

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'debit'
    }

    customer.statement.push(statementOperation)

    return response.json(customer.statement)
})

app.listen(3333, () => {
    console.log('RODANDO')
})