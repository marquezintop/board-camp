import { db } from "../db.js";

export async function getGames(req, res){

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

export async function insertNewGame(req, res){
    const { name, image, stockTotal, pricePerDay } = req.body;

    try{
        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
                        VALUES ($1, $2, $3, $4, $5)`
        , [ name, image, stockTotal, pricePerDay ]);

        res.sendStatus(201);
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}