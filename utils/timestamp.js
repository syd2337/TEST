function timeStp(){
var timestamp;
var date = new Date();
//年  
var Y = date.getFullYear();
//月  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日  
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
//时  
var h = date.getHours();
//分  
var m = date.getMinutes();
//秒  
var s = date.getSeconds();

//console.log("当前时间：" + date.toDateString());
timestamp = Y + M + D + h + m + s;
//console.log("当前时间：" + timestamp);
return timestamp;
}
module.exports.timeStp = timeStp;