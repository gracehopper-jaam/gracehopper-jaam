
module.exports = {
    ...require('./client'),
    ...require('./users'),
    ...require("./products"),
    ...require("./orders"),
    ...require("./order_items")
}
