import { db } from "../database/db.js";

export async function getGames(req, res) {

    try {
        const games = await db.query("SELECT * FROM games");

        return res.send(games.rows);
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function insertNewGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;

    try {
        const game = await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
            VALUES ($1, $2, $3, $4)
        `, [name, image, stockTotal, pricePerDay]);

        // const nameExist = await db.query(`SELECT * FROM games WHERE name=$1`
        // , [name]);
        // if(nameExist.rows[0]) return res.sendStatus(409);

        return res.status(201).json({ games: game.rows });
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}