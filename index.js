

require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");


async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const zen_quote = await (
        await fetch("https://zenquotes.io/api/random")
    ).json();

    console.log(zen_quote);


    const readme = readmeTemplate
        .replace("{zen_quote}", zen_quote[0].q)
        .replace("{zen_character}", `${zen_quote[0].a}`)

    await fs.writeFile("README.md", readme);
}

main();