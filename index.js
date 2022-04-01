const express = require('express');
const mongoose = require('mongoose')
const app = express();                    // inicialização do express
require('dotenv').config()

const Person = require ('./models/Person')

app.use(                                  // middleware de ler JSON
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.post('/person', async (req, res) => {

    const {name, salary, approved} = req.body;

    if (!name)
    {
        res.status(422).json({ error: 'O nome é obrigatório!! '})
    }

    const person = {
        name,
        salary,
        approved
    };

    try {

        await Person.create(person);
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    };
});

const DB_USER= process.env.DBUSER
const DB_PASS= process.env.DBPASS

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.ahxxt.mongodb.net/bdapi?retryWrites=true&w=majority`
    )
    .then(() =>{  
        console.log('Conectado ao MongoDB') 
        app.listen
    });

app.listen(3000);