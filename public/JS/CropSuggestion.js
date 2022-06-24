// display result

// document.addEventListener("keypress",function(event){
//     let key = event.key;
//     if(key=='Enter'){
//         // document.getElementsByClassName("getcrops-btn")[0].click();
//         displayresult()
//     }
// })



function displayresult(){
    let soilType = document.querySelector("#soiltype").value;
    let season = document.querySelector("#season").value;
    let investrange = document.querySelector("#investrange").value;

    // alert("Hello")
    // if(soilType!=="none" && season!=="none" && investrange!=="none" && water==="on"){
    if(soilType!=="none" && season!=="none" && investrange!=="none"){
        console.log('Crop Input taken successfully ')
        return true
        // document.querySelector(".success-msg").innerHTML="Successfully fetched the list of crops!";
        // document.querySelector(".container").style.lineHeight="7.5vh";
        // document.location.href="/cropResults"
        // document.querySelector(".output").style.display="block";
        // document.querySelector(".output").classList.remove("toggle-result");
        
    }
    else{
        alert("Enter all fields") 
        return false  
        // document.querySelector(".output").style.display="none";
        // document.querySelector(".output").classList.add("toggle-result");

    }
}