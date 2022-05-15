const express = require('express')
const app = express()
var port = process.env.PORT || 3000;
app.get("/",(req,res)=>{
    res.send("Bot Up And Running")
})
app.listen(port, function() {
console.log("Listening on Port 3000");
});
