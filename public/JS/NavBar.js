// sticky nav bar
window.onscroll=function(){
    let offset = document.querySelector("header").offsetTop; 
    // if(window.pageYOffset > offset){
    //     document.querySelector("header").classList.add("sticky")
    // }else{
    //     document.querySelector("header").classList.remove("sticky")
    // }

    if(window.scrollY > 1){
        document.querySelector('header').classList.remove("change-nav-scroll")
        // document.querySelector('.nav-element').style.color="#ffff";
    }else{
        document.querySelector('header').classList.add("change-nav-scroll")
    }
}