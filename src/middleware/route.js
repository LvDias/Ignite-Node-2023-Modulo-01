import { randomUUID } from "node:crypto"

import { Database } from "../database/index.js"
import { handleDate } from "../utils/date.js"
import { buildRoutePath } from "./params.js"
import { handleImportCSV } from "../database/import.js"

let database = new Database()

export const routes = [
    {
        path: buildRoutePath("/tasks"),
        method: "GET",
        handler: (req, res) => {

            const data = JSON.stringify(database.read("tasks"))
            res.writeHead(200).end(data)

        }
    },
    {
        path: buildRoutePath("/tasks"),
        method: "POST",
        handler: (req, res) => {

            let { title, description } = req.body

            if(title, description)
                database.insert("tasks", {
                    id: randomUUID(),
                    title, 
                    description, 
                    completed_at: null,
                    created_at: handleDate(),
                    updated_at: handleDate(),
                })
            else
                res.writeHead(204).end()

            res.writeHead(201).end()
        }
    },
    {
        path: buildRoutePath("/tasks/:id"),
        method: "PUT",
        handler: (req, res) => {

            let { id } = req.params
            let { title, description } = req.body

            if(title || description) 
                database.update("tasks", id, {
                    title, description
                })
            else
                res.writeHead(204).end()

            res.writeHead(204).end()
        }
    },
    {
        path: buildRoutePath("/tasks/:id/complete"),
        method: "PATCH",
        handler: (req, res) => {

            let { id } = req.params

            database.update("tasks", id, {completed_at: handleDate()})

            res.writeHead(204).end()
        }
    },
    {
        path: buildRoutePath("/tasks/:id"),
        method: "DELETE",
        handler: (req, res) => {

            let { id } = req.params

            database.delete("tasks", id)

            res.writeHead(204).end()
        }
    },
    {
        path: buildRoutePath("/import"),
        method: "GET",
        handler: (req, res) => {

            handleImportCSV()

            res.writeHead(201).end()
        }
    }
]