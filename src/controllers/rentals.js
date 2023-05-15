import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {

  try {
    const rentals = await db.query(`
      SELECT r.id, r."customerId", r."gameId", r."rentDate", r."daysRented", r."returnDate", r."originalPrice", r."delayFee",
        (SELECT JSON_BUILD_OBJECT('id', c.id, 'name', c.name) FROM customers c WHERE c.id = r."customerId") AS customer,
        (SELECT JSON_BUILD_OBJECT('id', g.id, 'name', g.name) FROM games g WHERE g.id = r."gameId") AS game
      FROM rentals r
    `);

    const rentalsInfos = rentals.rows.map((rental) => {
      return {
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate: rental.rentDate,
        daysRented: rental.daysRented,
        returnDate: rental.returnDate,
        originalPrice: rental.originalPrice,
        delayFee: rental.delayFee,
        customer: rental.customer,
        game: rental.game,
      };
    });

    return res.send(rentalsInfos);
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}

export async function postRentals(req, res) {
  try {
    const { customerId, gameId, daysRented } = req.body;

    const customer = await db.query("SELECT * FROM customers WHERE id = $1", 
    [customerId,]);
    if(!customer.rowCount) return res.status(400).send("Costumer doesn't exist");

    const game = await db.query("SELECT * FROM games WHERE id = $1", 
    [gameId]);
    if (!game.rowCount) return res.status(400).send("Game doesn't exist");

    const rentedGames = await db.query("SELECT COUNT(*) FROM rentals WHERE game_id = $1 AND return_date IS NULL",
      [gameId]);
      
    if(game.rows[0].stockTotal === rentedGames.rowCount) return res.status(400).send("Sold out game");

    const rentDate = new Date().toISOString().substring(0, 10);
    const originalPrice = daysRented * game.rows[0].pricePerDay;

    if (daysRented <= 0) return res.status(400).send("Invalid daysRented");

    await db.query(
      'INSERT INTO rentals ("customerId","gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
}