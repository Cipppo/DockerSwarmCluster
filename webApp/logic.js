


let inputSlider = document.getElementById("sliderInput")
let bytes_choose_label = document.getElementById("bytes_choosen")
bytes_choose_label.innerHTML = "Hai selezionato " + inputSlider.value + " cifre." 




inputSlider.addEventListener("change", function(e){
    console.log(e.target.value)
    bytes_choose_label.innerHTML = "Hai selezionato " + e.target.value + " cifre." 
})