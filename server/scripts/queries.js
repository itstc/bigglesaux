const createItemTable = "\
CREATE TABLE IF NOT EXISTS item (\
id VARCHAR(50) PRIMARY KEY, \
name VARCHAR(100), \
color VARCHAR(6), \
buyout INTEGER)";

module.exports = {
  createItemTable
}
