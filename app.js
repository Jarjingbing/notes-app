import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "notesApp",
    password: "############",
    port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let notes = [];

app.get("/", async (req, res) => {
	try {
		const result = await db.query("SELECT * FROM notes ORDER BY id ASC");
		notes = result.rows;
		
		res.render("index.ejs", {
			pageNotes: notes
		});
	} catch (err) {
		console.log(err);
	}
});

app.post("/add", async (req, res) => {
	const text = "INSERT INTO notes (name, content) VALUES ($1, $2)";
	const query = ['Name', 'The contents of your note goes here!'];
	
	try {
		await db.query(text, query);
		res.redirect("/");
	} catch (err) {
		console.log(err);
	}
});

app.post("/edit", async (req, res) => {
	const title = req.body.titleInput;
	const content = req.body.contentInput;
	const id = req.body.cardID;
	
	const text = "UPDATE notes SET name = $1, content = $2 WHERE id = $3";
	const query = [title, content, id];
	
	try {
		await db.query(text, query);
		res.redirect("/");
	} catch (err) {
		console.log(err);
	}
});

app.post("/delete", async (req, res) => {
	const id = req.body.delete;
	
	const text = "DELETE FROM notes WHERE id = $1";
	const query = [id];
	
	try {
		await db.query(text, query);
		res.redirect("/");
	} catch (err) {
		console.log(err);
	}
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});