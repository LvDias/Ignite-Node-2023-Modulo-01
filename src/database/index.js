import fs from "node:fs/promises"

let url = new URL('database.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(url, "utf-8")
        .then(res => this.#database = JSON.parse(res))
        .catch(() => this.#persist())
    }

    read(table) {

        return this.#database[table]
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
    }

    update(table, id, data) {
        let index = this.#database[table].map(database => database.id).indexOf(id)
        
        if(index > -1) {

            for(const [key, value] of Object.entries(data)) {
                if(value)
                    this.#database[table][index][key] = value
            }

            this.#persist()
        }
    }

    delete(table, id) {

        let index = this.#database[table].map(database => database.id).indexOf(id)
        
        if(index > -1) {
            this.#database[table].splice(index, 1)
            this.#persist()
        }

    }

    #persist() {
        fs.writeFile(url, JSON.stringify(this.#database))
    }

}