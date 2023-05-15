import { db } from "../db";

export async function getJogos(req, res){

    try{
        const games = await db.query(`
            SELECT g.*, c.name AS "categoryName" 
                FROM games AS g JOIN categories AS c
                    ON g."categoryId"=c.id
        `);
        return res.send(games.rows);

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function criarJogo(req, res){
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try{
        const categoryExists = await db.query(`SELECT * FROM categories WHERE id=$1`
        , [categoryId]);
        if(!categoryExists.rowCount){
            return res.sendStatus(400);
        }

        const nameExists = await db.query(`SELECT * FROM games WHERE name=$1`
        , [name]);
        if(nameExists.rowCount){
            return res.sendStatus(409);
        }

        await db.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
                        VALUES ($1, $2, $3, $4, $5)`
        , [ name, image, stockTotal, categoryId, pricePerDay ]);

        res.sendStatus(201);

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}