const HTTP = require("./request")
module.exports = {
    "getHomePage": function () {
        return HTTP({
            methods: "get",
            data: {
                page_type: "home",
                page_id: 0
            },
            url: "/home/page"
        })
    },
    "getDetailsData":function(data){
        return HTTP({
            method:"get",
            url:"/miproduct/view",
            data
        })

        
    }
}