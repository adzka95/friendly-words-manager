import {emptyDb} from "./format"
import {configsDatabase} from "../libs/confy/fileSystem/paths"
import {getDatabase} from "../libs/db/db"

const db = getDatabase(configsDatabase, emptyDb)

export const addRecord = db.addRecord
export const updateRecord = db.updateRecord
export const deleteRecord = db.deleteRecord
export const readTable = db.readTable
export const createTable = db.createTable
export const readDbSafe = db.readDbSafe
export const modifyDb = db.modifyDb

export const createTableForModel = model => createTable(model.name)