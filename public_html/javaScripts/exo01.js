/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function addToBasket(){
    var productList = [];
    //  CIBLAGE DU CHAMP DE SAISIE
    var entreeProduit = document.getElementById("saisieProduit");
    
    //  CIBLAGE DU PANIER
    var basketElements = document.getElementById("exo01_basket");
    
    if(basketElements.firstChild === null){
//        console.log("firstChild is null");
    }else{
//        console.log("firstChild is not null");
        listElementCollection = basketElements.getElementsByTagName("div");
        for(i = 0; i < listElementCollection.length ; i++){

            productList[i] = listElementCollection[i].innerHTML;
        }
        //  INSERTION DES PRODUITS SAISIS DANS UN TABLEAU
    }
    productList.push(entreeProduit.value);
    majVue(productList);
    entreeProduit.value = "";
    entreeProduit.focus();
    
//    majVue();
    
    
}

function majVue(productList){
    
    console.log(productList);
    //  CIBLAGE DE LA ZONE BASKET
    var basket = document.getElementById("exo01_basket");
    
    basket.innerHTML = "";
    //  BOUCLE SUR LA LISTE DES PRODUITS POUR AFFICHAGE
    for(var i = 0 ; i < productList.length ; i++){
        var newDiv = document.createElement("div");
        newDiv.appendChild(document.createTextNode(productList[i]));
        basket.appendChild(newDiv);
    }
    
}