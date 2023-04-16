import { IDBS } from "@/utils/IDBO.js";
const databaseName = "cgatDB";
const version = 1;
const tableName = "chatList";
export const chatDB = new IDBS({ databaseName, version, tableName });

const tableName1 = "chatDetails";
const databaseName1 = "details";
export const chatDetailDB = new IDBS({
  databaseName: databaseName1,
  version,
  tableName: tableName1,
});

const tableName2 = "chatIndex";
const databaseName2 = "chatIndex";
export const chatIndex = new IDBS({
  databaseName: databaseName2,
  version,
  tableName: tableName2,
});
