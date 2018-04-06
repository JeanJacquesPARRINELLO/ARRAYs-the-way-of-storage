/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function addToBasket(){
    //  LISTE DES PRODUITS INCLUS DANS LE PANIER
    var productList = [];
    //  CIBLAGE DU CHAMP DE SAISIE
    var entreeProduit = document.getElementById("saisieProduit");
    
    //  CIBLAGE DU PANIER
    var basketElements = document.getElementById("exo01_basket");
    
    
    if(basketElements.firstChild === null){
        //  SI LE PANIER EST VIDE
    }else{  //  SI LE PANIER N'EST PAS VIDE
        
        //  RÉCUPÉRATION DES ENTRÉES DU PANIER DANS UN TABLEAU
        listElementCollection = basketElements.getElementsByTagName("li");
        
        //  EXTRACTION DES PRODUITS DU PANIER POUR LES RANGER DANS UNE VARIABLE DE TRAVAIL
        for(i = 0; i < listElementCollection.length ; i++){
            productList[i] = listElementCollection[i].innerHTML;
            //  LE PRODUIT EST SAISI POUR LA PREMIÈRE FOIS
            //  SA QUANTITÉ VAUT 1
            qtyList[i] = 1;        }
    }
    //  CONTRÔLE DE L'EXISTENCE DANS LE PANIER DU NOUVEAU PRODUIT SAISI
    if(!isAlreadyIn(productList , entreeProduit.value)){
        //  INSERTION DU PRODUIT SAISI DANS LE TABLEAU S'IL N'EST PAS PRÉSENT DANS LE PANIER
        productList.push(entreeProduit.value);
    }
    //  MISE À JOUR DU PANIER
    majVue(productList);
    //  PRÉPARATION DU CHAMP POUR LA NOUVELLE SAISIE
    entreeProduit.value = "";
    entreeProduit.focus();
}

function majVue(productList){
    
    //  CIBLAGE DE LA ZONE BASKET
    var basket = document.getElementById("exo01_basket");
    
    basket.innerHTML = "";
    //  BOUCLE SUR LA LISTE DES PRODUITS POUR AFFICHAGE
    for(var i = 0 ; i < productList.length ; i++){
        var newLi = document.createElement("li");
        newLi.appendChild(document.createTextNode(productList[i]));
        basket.appendChild(newLi);
    }
    
}

function isAlreadyIn(basket , element){
    //  PARCOURS DE LA LISTE DES PRODUITS CONTENUS DANS LE PANIER
    for(i = 0 ; i < basket.length ; i++){
        if(basket[i] === element){
            //  ON RETOURNE TRUE SI LE PRODUIT EXISTE
            return true;
        }
    }
    //  LE PROSUIT N'A PAS ÉTÉ TROUVÉ, ON RETOURNE FALSE
    return false;
}