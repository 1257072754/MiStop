const HTTP = require("./request");

module.exports = {
    "getCategoryV2Data": function (data) {
        return HTTP({
            method: "get",
            data,
            url: "/home/category_v2"
        })
    },
}