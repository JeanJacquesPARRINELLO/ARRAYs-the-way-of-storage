/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//  QUANTITÉS DE CHACUN DES PRODUITS INCLUS DANS LE PANIER
var qtyList = [];
    
function addToBasket(){
    //  CIBLAGE DU CHAMP DE SAISIE
    var entreeProduit = document.getElementById("saisieProduit");
    
    
    //  EXTRACTION DES PRODUITS DU PANIER POUR LES RANGER DANS UNE VARIABLE DE TRAVAIL
    var productList = getProductListFromBasket();
    //  CONTRÔLE DE L'EXISTENCE DANS LE PANIER DU NOUVEAU PRODUIT SAISI
    if(!isAlreadyIn(productList , entreeProduit.value)){
        //  INSERTION DU PRODUIT SAISI DANS LE TABLEAU S'IL N'EST PAS PRÉSENT DANS LE PANIER
        productList.push(entreeProduit.value);
        //  INITIALISATION DU TABLEAU DES QUANTITÉS PRODUITS À 1
        qtyList.push(1);
    }else{
        updateQuantity(productList , entreeProduit.value);
    }
    //  MISE À JOUR DU PANIER
    majVue(productList);
    //  PRÉPARATION DU CHAMP POUR LA NOUVELLE SAISIE
    entreeProduit.value = "";
    entreeProduit.focus();
}

function getProductListFromBasket(){
    
    //  CIBLAGE DU PANIER
    var basketElements = document.getElementById("exo01_basket");
    var productList = [];
    
    if(basketElements.firstChild === null){
        //  SI LE PANIER EST VIDE
    }else{  //  SI LE PANIER N'EST PAS VIDE
        
        //  RÉCUPÉRATION DES ENTRÉES DU PANIER DANS UN TABLEAU
        listElementCollection = basketElements.getElementsByTagName("li");
        
        //  EXTRACTION DES PRODUITS DU PANIER POUR LES RANGER DANS UNE VARIABLE DE TRAVAIL
        for(i = 0; i < listElementCollection.length ; i++){
//            console.log(listElementCollection[i].lastChild.innerHTML);
            productList[i] = listElementCollection[i].lastChild.innerHTML;
        }
    }
    return productList;
}

function majVue(productList){
    
    //  CIBLAGE DE LA ZONE BASKET
    var basket = document.getElementById("exo01_basket");
    
    basket.innerHTML = "";
    //  BOUCLE SUR LA LISTE DES PRODUITS POUR AFFICHAGE
    for(var i = 0 ; i < productList.length ; i++){
        

//        console.log("newLi.value " + addControllers(i).value);
        basket.appendChild(addControllers(i , productList[i]));
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

function updateQuantity(basket , element , Xcrement){
    //  PARCOURS DE LA LISTE DES PRODUITS CONTENUS DANS LE PANIER
    for(i = 0 ; i < basket.length ; i++){
        if(basket[i] === element){
            switch(Xcrement){
                case("down"):
                    qtyList[i] -= 1;
                    break;
                default:
                    qtyList[i] += 1;
                    break;
            }
        }
    }
//    console.log("qtyList dans updateQuantity => " + qtyList);
//    console.log(qtyList);
}

function addControllers(index , value){
    
//    console.log("qtyList dans addControllers => " + qtyList);
//    console.log(qtyList);
    //  <a href=’’#’’ onclick=’’remove(5)’’> - </a> <a href=’’#’’ onclick=’’add(5)’’> + </a> : cal-en-d’os
    var newLi = document.createElement("li");
        //  AJOUT DU LIEN DÉCRÉMENT
        var newA = document.createElement("a");
        //  AJOUT DU TEXTNODE "-"
        newA.appendChild(document.createTextNode("-"));
        newA.setAttribute("href" , '#');
        newA.setAttribute("class" , 'controllers');
        newA.setAttribute("onclick" , "remove(" + index + ")");
        newLi.appendChild(newA);
        
        //  AJOUT DE LA QUANTITÉ
        newLi.appendChild(document.createTextNode(" > " + qtyList[index] + " < "));
        
        //  AJOUT DU LIEN INCRÉMENT
        var newA = document.createElement("a");
        //  AJOUT DU TEXTNODE "+"
        newA.appendChild(document.createTextNode("+"));
        newA.setAttribute('href' , '#');
        newA.setAttribute("class" , 'controllers');
        newA.setAttribute("onclick" , "add(" + index + ")");
        newLi.appendChild(newA);
        
        newLi.appendChild(document.createTextNode(" : "));
        var newSpan = document.createElement("span");
            newSpan.appendChild(document.createTextNode(value));
        newLi.appendChild(newSpan);
        
        
    return newLi;
}

function add(index){
    var productList = getProductListFromBasket();
    
    updateQuantity(productList , productList[index] , "up");
    majVue(productList);
}

function remove(index){
    var productList = getProductListFromBasket();
    
    //  VARIABLES PERMETTANT DE RECONSTRUIRE LE PANIER ET LES QUANTITÉS PRODUITS
    //  POUR FAIRE CORRESPONDRE LES INDEX DES DEUX LISTES LORS D'UNE MISE À ZÉRO D'UNE QUANTITÉ
    var returnList = [];
    var tempQtyList = [];
    
    updateQuantity(productList , productList[index] , "down");
    
    //  CONTRÔLE DES PRODUITS EN QUANTITÉ NULLE
    for(var i = 0 ; i < qtyList.length ; i++){
        if(qtyList[i] != 0){
            //  RECONSTRUCTION DES TABLEAUX PANIER ET QUANTITÉ
            //  POUR LES PRODUITS DE QUANTITÉ NON NULLE
            returnList.push(productList[i]);
            tempQtyList.push(qtyList[i]);
        }
    }
    //  MISE À JOUR DU TABLEAU DES QUANTITÉS
    qtyList = tempQtyList;
    //  MISE À JOUR DU PANIER
    majVue(returnList);
}