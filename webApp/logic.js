


let inputSlider = document.getElementById("sliderInput")
let bytes_choose_label = document.getElementById("bytes_choosen")
let button = document.getElementById("generate_number")
let generated_number = document.getElementById("generated_number")
bytes_choose_label.innerHTML = "Hai selezionato " + inputSlider.value + " cifre." 



function sendRequest(n){
    const url = `http://10.133.7.101:5000/getString/${n}`

    axios.get(url)
    .then(result => generated_number.innerHTML = result.data["res"])
}

inputSlider.addEventListener("change", function(e){
    console.log(e.target.value)
    bytes_choose_label.innerHTML = "Hai selezionato " + e.target.value + " cifre." 
})

button.addEventListener("click", function(e){
    console.log("Sending Request")
    bytes_to_request = inputSlider.value
    sendRequest(bytes_to_request)
})