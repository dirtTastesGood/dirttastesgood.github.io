window.addEventListener("load", function(){
    let container = document.getElementById("mandala-container");
    container.style.opacity = 1;
    for(i=1; i <= 8; i++){
        let layer = document.getElementById("layer"+i);
            layer.style.opacity = 1;
    }

    let initials = document.getElementById("initials")
    initials.style.opacity = 1;

    downArrowContainer = document.getElementById("down-arrow-container-1");
    downArrowContainer.style.opacity = 1;
    
    downArrow_1 = document.getElementById("down-arrow-1");
    downArrow_1.style.opacity = 1;

    mandalaBorder = document.getElementById("mandala-border");
    mandalaBorder.style.opacity = 1;

});