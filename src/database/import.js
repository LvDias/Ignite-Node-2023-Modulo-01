import fs from "fs"
import { parse } from "csv"

export function handleImportCSV() {

    let data = []

    fs.createReadStream("import.csv")
    .pipe(parse({delimiter: ",", from: 2}))
    .on('data', (csv) => {
        data.push(csv)
    })
    .on('end', async () => {
        for(let i = 0; i < data.length; i++) {
            console.log(data)
            await fetch("http://localhost:3333/tasks", {
                method: "POST",
                body: JSON.stringify({
                    title: data[i][0],
                    description: data[i][1]
                })
            })
        }
    })

}