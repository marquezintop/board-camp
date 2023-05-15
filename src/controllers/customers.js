import { db } from "../database/db.js";

export async function getCustomersList(req, res) {
    const queryCPF = req.query.cpf;

    try{
        const customers = await db.query(`SELECT * FROM customers`);

        return res.sen(customers);
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function getCustomer(req, res) {
    const { id } = req.params;

    try{
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1`
        , [id]);

        if(!customer.rows.length) return res.sendStatus(404);

        return res.send(customer.rows[0])
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function insertNewCustomer(req, res){
    const { name, cpf, birthday, phone } = req.body;

    const birthdayDate = new Date(birthday);
    const birthdayString = birthdayDate.toISOString().substring(0, 10);

    try{
        const cpfExists = await db.query(`SELECT * FROM customers WHERE cpf=$1`
        , [cpf]);
        if(cpfExists.rowCount) return res.sendStatus(409);

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) 
                        VALUES ($1, $2, $3, $4)`
        , [  name, cpf, birthdayString, phone ]);

        res.sendStatus(201);
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function updateCustomer(req, res){
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    const birthdayDate = new Date(birthday);
    const birthdayString = birthdayDate.toISOString().substring(0, 10);

    try{
        const customerExists = await db.query(`SELECT * FROM customers WHERE cpf=$1 AND id!=$2`
        , [ cpf, id ]);
        if(customerExists.rowCount) return res.sendStatus(409);

        await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`
        , [ name, phone, cpf, birthdayString, id ]);
        
        res.sendStatus(200)
    
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}