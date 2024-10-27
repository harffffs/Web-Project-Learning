// display output
function myFunction(val) {
    document.getElementById("calc").value += val;
}
// clear function
function clr() {
    document.getElementById("calc").value = null;
}
// solve function
function slv() {
    let x = document.getElementById("calc").value;
    let y = eval(x);
    document.getElementById("calc").value = y;
}
// delete function
function del() {
    let x = document.getElementById("calc").value;
    document.getElementById("calc").value = x.slice(0, -1);
}