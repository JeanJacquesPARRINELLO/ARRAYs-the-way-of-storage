/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//  PANIER : CONTIENT L'INTITULÉ DES PRODUITS ET LEUR QUATITÉ ASSOCIÉES
var productJson = {};


/**************************************************************************************
**  
**  JQUERY  -   ÉVÈNEMENT GÉRÉS PAR LE NAVIGATEUR
**  
 **************************************************************************************/

//  ON DONNE LE FOCUS AU CHAMP DE SAISIE LORSQUE LA PAGE EST CHARGÉE
$(window).load(function(){
    document.getElementById("saisieProduit").focus();
});


//  ON ECOUTE L'ÉVÈNEMENT keyup() SUR LE CHAMP DE SAISIE DES PRODUITS
$("#saisieProduit").keyup(function(touche){ 
    
    //  COMPATIBILITÉ AVEC TOU LES NAVIGATEURS
    var appui = touche.which || touche.keyCode; 
    //  SI LA TOUCHE ENFONCÉE EST LA TOUCHE "ENTRÉE" CODE 13
    if(appui == 13){
        //  ON APPELLE LE CONTROLEUR
        addToBasket();
    }
});


/**************************************************************************************
**  
**  MÉTHODES DE L'APPLICATION
**  
 **************************************************************************************/

function addToBasket(){
    //  CIBLAGE DU CHAMP DE SAISIE
    var entreeProduit = document.getElementById("saisieProduit");
        
    //  MISE À JOUR DU PANIER ET DE LA VUE
    updateView(updateBasket(entreeProduit.value));
        
    //  PRÉPARATION DU CHAMP POUR LA NOUVELLE SAISIE
    entreeProduit.value = "";
    entreeProduit.focus();
}

function updateBasket(pEntreeProduit){
    
    //  CONTRÔLE DE L'EXISTENCE DANS LE PANIER DU NOUVEAU PRODUIT SAISI
    if(!isAlreadyIn(pEntreeProduit)){
        //  SI LE PRODUIT N'EST PAS DANS LE PANIER
        //  INSERTION DU PRODUIT SAISI DANS LE TABLEAU S'IL N'EST PAS PRÉSENT DANS LE PANIER
        productJson[pEntreeProduit] = 1;
        return("Le produit a été ajouté à votre panier.")
    }else{
        //  SI LE PRODUIT EST DÉJÀ DANS LE PANIER
        //  MISE À JOUR DE LA QUANTITÉ ASSOCIÉE
        updateQuantity(pEntreeProduit);
        return("1 produit a été ajouté à votre panier.");
    }
}

function updateView(pMessagePopup){
    
    //  APPEL DU POPUP DE CONFIRMATION DE SUPPRESSION
    if(pMessagePopup){
        popupInfo(pMessagePopup);
        $("#messagePopup").fadeTo(1000, 1);
        $("#messagePopup").fadeTo(1000, 0);
    }
    
    //  CIBLAGE DU PANIER
    var basket = document.getElementById("exo01_basket");
    
    basket.innerHTML = "";
    //  BOUCLE SUR LA LISTE DES PRODUITS POUR AFFICHAGE
    for(var item in productJson){
        basket.appendChild(addControllers(item , productJson[item]));
    }
}

function isAlreadyIn(pItem){
    //  PARCOURS DE LA LISTE DES PRODUITS CONTENUS DANS LE PANIER
    if(productJson[pItem] !== undefined){
        //  ON RETOURNE TRUE SI LE PRODUIT EXISTE
        return true;
    }
    //  LE PROSUIT N'A PAS ÉTÉ TROUVÉ, ON RETOURNE FALSE
    return false;
}

function updateQuantity(itemBasket , Xcrement){
    //  PARCOURS DE LA LISTE DES PRODUITS CONTENUS DANS LE PANIER
    for(var item in productJson){
        if(itemBasket == item){
            switch(Xcrement){
                case("down"):
                    productJson[item] -= 1;
                    break;
                default:
                    productJson[item] += 1;
                    break;
            }
        }
    }
}

function addControllers(index , value){
    
    var newLi = document.createElement("li");
        //  AJOUT DU LIEN DÉCRÉMENT
        var newA = document.createElement("a");
        //  AJOUT DU TEXTNODE "-"
        newA.appendChild(document.createTextNode("-"));
        newA.setAttribute("href" , '#');
        newA.setAttribute("class" , 'controllers');
        newA.setAttribute("onclick" , "remove('" + index + "')");
        newLi.appendChild(newA);
        
        //  AJOUT DE LA QUANTITÉ
        newLi.appendChild(document.createTextNode(" > " + value + " < "));
        
        //  AJOUT DU LIEN INCRÉMENT
        var newA = document.createElement("a");
        //  AJOUT DU TEXTNODE "+"
        newA.appendChild(document.createTextNode("+"));
        newA.setAttribute("href" , '#');
        newA.setAttribute("class" , 'controllers');
        newA.setAttribute("onclick" , "add('" + index + "')");
        newLi.appendChild(newA);
        
        newLi.appendChild(document.createTextNode(" : "));
        var newSpan = document.createElement("span");
            newSpan.appendChild(document.createTextNode(index));
        newLi.appendChild(newSpan);
        
    return newLi;
}

function add(index){
    
    updateQuantity(index , "up");
    updateView("1 produit a été ajouté à votre panier");
}

function remove(index){
    
    updateQuantity(index , "down");
    
    //  CONTRÔLE DES PRODUITS EN QUANTITÉ NULLE
        if(productJson[index] == 0){
            delete productJson[index];
            updateView("Le produit a disparu de votre panier.");
        }else{
            //  MISE À JOUR DU PANIER
            updateView("1 produit a été supprimé de votre panier.");
        }
}

function popupInfo(message){
    $("#messagePopup").remove();
    //  CREATION DE L'OBJET RECEVANT LE MESSAGE
    var newAside = document.createElement("aside");
        newAside.setAttribute("class" , "messagePopup");
        newAside.setAttribute("id" , "messagePopup");
        newAside.appendChild(document.createTextNode(message));
        newAside.style.opacity = 0;
        
    var theBody = document.querySelector("body");
        theBody.appendChild(newAside);
        
        
        
}