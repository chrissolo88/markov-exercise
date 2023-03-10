/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");
let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
} else if (method === "url") {
    makeURLText(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}

function makeText(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

async function makeURLText(url) {
    let resp;

    try {
        resp = await axios.get(url);
        generateText(resp.data)
    } catch (err) {
        console.error(`ERROR: ${err}`);
    }
}

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}