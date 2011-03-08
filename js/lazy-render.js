/**
 * #############################################################################
 *
 * lazyRender
 * 
 * syst�me de lazy load appliqu� au rendu du Html.
 * Permet d'afficher des commentaires apr�s l'affichage initial de la page.
 * 
 * @author      Erwan Lef�vre <erwan.lefevre@gmail.com>
 * @copyright   Erwan Lef�vre 2010
 * @license     Creative Commons - Paternit� 2.0 France - http://creativecommons.org/licenses/by/2.0/fr/
 * @version     v1.0
 * @see         http://webbricks.org/bricks/jQuery.lazyRender/
 * @compatible  au 7 janvier 2011, compatibilit� assur�e pour :
 *              Firefox 3+, Internet Explorer 6+, Op�ra, Safari, Chrome 
 *              Autres versions et navigateurs non test�s
 *              
 * #############################################################################
 */
(function( $ ){

    $.fn.lazyRender = function( settings ){
            
        /* d�claration pr�liminaires
        ========================================================================= */
        
        var self = this,                // r�f�rence � l'objet jQuery courant
            reg,                        // regexp servant � identifier les commentaires �ligibles
            selected = [],              // �l�ments retenus pour le traitement
            addedNodes = [],            // ensemble des noeuds ajout�s, pour la callback onComplete
            deletedNodes = [];          // ensemble des noeuds supprim�s, pour la callback onComplete
            
        /* affiche un commentaire donn�
        ------------------------------------------------------------------------- */
        
        function showComment( commentNode ){
            
            var tmpParent,                                  // conteneur temporaire des nouveaux noeuds
                tmpNodes,                                   // liste des noeuds dans le conteneur temporaire
                commentParent = commentNode.parentNode,     // le noeud parent du commentaire en cours de traitement
                createdNodes = [];                          // noeuds cr��s (dans le v�ritable conteneur)
            
            // Cr�er un �l�ment invisible pour recevoir temporairement le contenu des commentaires
            tmpParent = document.createElement( "div" );
            tmpParent.style.display = "none";
            tmpParent = document.body.appendChild( tmpParent );
            
            // ajout du code dans le conteneur temporaire
            $( tmpParent ).html( commentNode.nodeValue.replace( reg, "" ) );
    
            // copie (et relev�) des noeuds ainsi cr��s dans leur parent final
            tmpNodes = tmpParent.childNodes;
            while ( tmpNodes[ 0 ] ) {
                createdNodes.push ( commentParent.insertBefore( tmpNodes[ 0 ], commentNode ) );
            }
                
            // suppression du commentaire et du conteneur temporaire
            $( tmpParent ).remove();
            $( commentNode ).remove();
            
            // fonctions callBack
            if ( settings.onShow ) {
                // en pr�paration de onComplete
                addedNodes.push( createdNodes );
                deletedNodes.push( commentNode );
                
                // ex�cution de onShow
                settings.onShow.call(
                    self,           // this vaut pour l'objet jQuery courant
                    createdNodes,   // premier argument : les noeuds cr��s
                    commentNode     // second argument : le noeud supprim�
                );
            }
        }
            
            
        /* recherche les commentaires � afficher, et lance leur affichage
        ------------------------------------------------------------------------- */
        
        function testAndShow(){
            var i, bottom,
                win = $( window ),
                cmt, $cmt, test,
                elemProche;
            
            bottom = win.scrollTop() + win.height() + settings.tolerance;
            
            for ( i = 0; i < selected.length; i++ ){ // !! il faut reprendre la mesure de selected.length � chaque fois
                
                cmt = selected[ i ];
                // mode "instant", tous les commentaires doivent �tre affich�s
                if ( settings.showMode == "instant" ) {
                    test = 1;
                }
                
                // mode "scroll", seuls les commentaires visibles (ou pr�s de l'�tre) doivent �tre affich�s
                else {
                    // prendre l'�l�ment le plus proche du commentaire (suivant, ou pr�c�dent, ou parent)
                    $cmt = $( cmt );
                    elemProche = $cmt.next().length ? $cmt.next() : $cmt.prev().length ? $cmt.prev() : $cmt.parent() ;
                    
                    // v�rifier si cet �l�ment est visible (ou pr�s de l'�tre)
                    elemProche = elemProche.offset().top;
                    test = elemProche < bottom;
                }
                
                // lancger l'affichage du commentaire
                if ( test ) {
                    showComment( cmt );
                    selected.splice( i, 1 );
                    i--;
                }
            }
            
            // � la fin de l'affichage de tous les commentaires s�lectionn�s
            if ( !selected.length ) {
                
                // cesser d'appeler testAndShow
                $( window ).unbind( "resize", testAndShow ).unbind( "scroll", testAndShow );
                
                // fonction callback de fin
                if ( settings.onComplete ) {
                    settings.onComplete.call(
                        self,           // this
                        addedNodes,     // argument 1 : l'ensemble les noeuds cr��s
                        deletedNodes    // argument 2 : l'ensemble les noeuds supprim�s
                    );
                }
            }
        }
        
        
        /* ex�cution du script
        ========================================================================= */
        
        /* traitement des settings
        ------------------------------------------------------------------------- */
        
        // settings par d�faut
        settings = $.extend({
            onShow: 0,              // {Function} fonction a �x�cuter quand un commentaire est affich�. (this:objet jquery courant, arg1:noeuds cr��s, arg2:commentaire supprim�)
            onComplete: 0,          // {Function} fonction a �x�cuter � la fin du traitement. (this:objet jquery courant, arg1:noeuds cr��s, arg2:commentaires supprim�s)
            label: "lazyRender",    // {String|RegExp} chaine de caract�res alaphab�tiques (ou expression r�guli�re) employ�e pour identifer les commentaires � afficher ("" pour afficher tous les commenaires)
            showMode: "scroll",     // {String} � quel moment afficher les commentaires ? "instant":imm�diatement | "scroll":quand on est au bas de la page
            tolerance: 200          // {Integer} permet d'afficher les commentaire un certain nombre de piwels avant qu'ils soient au bord de la fen�tre.
        }, settings);
        
        reg = settings.label instanceof RegExp ? settings.label : new RegExp("^[ \t\r\n]*" + settings.label, "m");
        
        
        /* rechercher des commentaires � afficher, parmi tous les �l�ments de la page
        ------------------------------------------------------------------------- */
        
        this.add( this.find( "*" ) ).not("script", "style").each(function(i,elem){
            $.each(elem.childNodes, function(tmp,node){
                if ( node.nodeType === 8 ) { // commentaire
                    if ( reg.test( node.nodeValue.substr( 0, 30 ) ) ) {
                        selected.push( node );
                    }
                }
            });
        });
        
        
        /* traitement des commentaires retenus
        ------------------------------------------------------------------------- */
        
        // traitement progressif, en fonction du scroll
        if ( settings.showMode == "scroll" ) {
            $( window ).resize( testAndShow ).scroll( testAndShow );
        }
        // traitement initial
        testAndShow();
        
        
        /* cha�nage final de jQuery
        ------------------------------------------------------------------------- */
        return this;
    };
    
})( jQuery );