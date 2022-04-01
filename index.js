const express = require('express');
const mongoose = require('mongoose')
const app = express();                    // inicialização do express

const Person = require ('./models/Person')

app.use(                                  // middleware de ler JSON
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.post('/person', async (req, res) =>{

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create();
    } catch (error) {
        res.status(500).json({error: error})
    }
});

const DB_USER= 'ayrtonftridico'
const DB_PASS= 'DDJElvvgz8FwN7pN'

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.ahxxt.mongodb.net/bdapi?retryWrites=true&w=majority`
    )
    .then(() =>{  
        console.log('Conectado ao MongoDB') 
        app.listen
    });

app.listen(3000);