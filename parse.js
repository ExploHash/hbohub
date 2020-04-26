const fs = require("fs");

let filecontent = fs.readFileSync("./assets/inputdata.json");
let parsed = JSON.parse(filecontent);

let onlyMale = parsed.filter(row => row.GESLACHT === "vrouw")

let list = onlyMale.map((row, index) => {
  return {
    provincie: row.PROVINCIE,
    gemeentenaam: row.GEMEENTENAAM,
    hoofdcategorie: row["CROHO ONDERDEEL"],
    subcategorie: row["CROHO SUBONDERDEEL"].substring(0,5) !== "n.v.t" ? row["CROHO SUBONDERDEEL"] : false,
    opleidingstype: row["TYPE HOGER ONDERWIJS"],
    opleidingscode: row["OPLEIDINGSCODE ACTUEEL"],
    opleidingsnaam: row["OPLEIDINGSNAAM ACTUEEL"].substring(row["OPLEIDINGSNAAM ACTUEEL"].indexOf(" ") + 1, row["OPLEIDINGSNAAM ACTUEEL"].length),
    opleidingsvorm: row.OPLEIDINGSVORM.split(" ")[0],
    opleidingsinstelling: row["INSTELLINGSNAAM ACTUEEL"],
    brin: row["BRIN NUMMER ACTUEEL"],
    id: index
  }
});

fs.writeFileSync("./assets/data.json", JSON.stringify(list));