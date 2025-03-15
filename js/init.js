//initialize sidenav
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems, {});
});

//initialize parallax
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.parallax');
    const instances = M.Parallax.init(elems, {});
  });

//initialize collapsible
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.collapsible');
    const instances = M.Collapsible.init(elems, {});
  });

//show div id cookiepolicy as modal (initialize modal for cookiepolicy)
document.addEventListener('DOMContentLoaded', function () {
    const elem = document.getElementById('cookiepolicy');
    const instances = M.Modal.init(elem, {dismissible: false});
    instances.open();
  });

//initialize materialboxed
 document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.materialboxed');
    const instances = M.Materialbox.init(elems, { // specify options here
                                                });
   });

//funzione generalizzata per sostituire il testo di un elemento mantenendo i link
//usa un array di nodi da sostituire esterni ai link (sostituzioni), meglio mettere un elemento dell'array per ogni nodo diverso che si vuole cambiare, senza HTML entity o HTML special character
function rimpiazzaTestoConLinks(element, sostituzioni) {
    //itera attraverso i nodi dell'elemento
    for (let i = 0; i < element.childNodes.length; i++) {
        let textnode = element.childNodes[i];
        //se il nodo è di tipo testo cerca di sostituirlo
        if (textnode.nodeType === Node.TEXT_NODE) {
           let testoOriginale = textnode.textContent;
           //se il testo del nodo corrisponde esattamente a una chiave di sostituzione sostituisce il testo con il valore corrispondente
           if (sostituzioni[testoOriginale]) {
              textnode.textContent = unescape(sostituzioni[testoOriginale]);
             }
          }
          //se il nodo è un <a> non fa nulla
          else if (textnode.nodeType === Node.ELEMENT_NODE && textnode.tagName === 'A') {}
       }
   }

function splash4province(e) {
    //crea l'elemento video ridotto al minimo e il link di chiusura, li sostituisce alla colonna di sinistra, allarga il video, lo avvia e inizializza l'elemento per javascript, cambia il testo per segnalare come tornare, cambia il link per tornare
    //crea l'elemento video ridotto al minimo 
    var videoelement = document.createElement('video');
    videoelement.id = 'videoscalabile';
    videoelement.className='materialboxed responsive-video scale-transition scale-out';
    videoelement.alt='Zoom sulle quattro province';
    videoelement.dataset.caption = 'dettaglia del nord, dove sono io';
    var sourceMP4element = document.createElement('source'); 
    sourceMP4element.type = 'video/mp4';
    sourceMP4element.src = 'img/4province.mp4';
    videoelement.appendChild(sourceMP4element);
    //crea l'hyperlink di chiusura
    var linkelement = document.createElement('a');
    linkelement.id = 'chiude';
    linkelement.href = '#!';
    linkelement.style="font-size:5vw;"
    linkelement.className = 'indigo-text text-darken-4 Heading h2';
    linkelement.setAttribute('onclick', 'risistemadachiude(event);');
    linkelement.innerText = 'qui puoi eliminare lo zoom';
    //per la sostuituzione crea un contenitore (che occupa tutta la larghezza disponibile e con altezza che dipenderà dal video) con il video e l'hyperlink
    var container = document.createElement('div');
    container.style.position = 'relative';
    container.style.display = 'inline-block';
    container.style.width = '100%'; 
    container.style.height = 'auto';
    container.appendChild(videoelement);
    container.appendChild(linkelement);
    //sostituisce il contenuto della colonna
    var divelement = document.getElementById('colonna1');
    divelement.replaceChildren(container);
    //ingrandisce ed avvia il video
    videoelement.classList.replace('scale-out','scale-in');
    //posizione l'hyperink sopra il video
    linkelement.style.position = 'absolute';
    linkelement.style.top = '50%'; 
    linkelement.style.left = '50%';
    linkelement.style.transform = 'translate(-50%, -50%)';
    linkelement.style.width = '100%';
    linkelement.style.textAlign = 'center'; 
    linkelement.style.display = 'none';
    linkelement.style.zIndex = '10'; 
    videoelement.play();
    //a fine video lo attiva per javascript e mostra il link
    videoelement.addEventListener('ended', function() {
                                                       linkelement.style.display = 'block';
                                                       M.Materialbox.init(videoelement);
                                                      }
                                 );
    //cambia il testo
    rimpiazzaTestoConLinks(document.getElementById('quattroprovince'),
                           {', o ': ' (mentre ',
                            '.': ').'           
                           }
                          );
    //cambia il link
    e.currentTarget.setAttribute('onclick', 'risistema(event);');
    e.currentTarget.innerHTML = 'qui puoi eliminare lo zoom';
   }

function risistema(e) {
    //ricrea l'elemento HTML di contatto, inverte il video, gli toglie l'hyperlink da sopra, esegue il video invertito e lo sostituisce alla colonna di sinistra, rimette a posto il testo, rimette a posto il link
    //ricrea l'elemento HTML di contatto che era andato distrutto
    var htmlelement = document.createElement('div');    
    htmlelement.innerHTML+=`<h5 class="white-text">Contatti</h5>
                            <ul>
                             <li class="white-text">Apicoltura bell\'Italia<br>Alberto Massocchi<br>Via per Casteggio 38<br>Montebello della Battaglia (PV)</li>
                             <li class="white-text">tel. <a href="tel:0039038382619" class="brown-text text-lighten-3">+39038382619</a></li>
                             <li class="white-text">cell. <a href="tel:00393356895071" class="brown-text text-lighten-3">+393356895071</a></li>
                             <li class="white-text">email <a href="mailto:alberto.massocchi@gmail.com?subject=Apicoltura bell\'Italia" target="_blank" class="brown-text text-lighten-3">alberto.massocchi@gmail.com</a></li>
                           </ul>
                           `;                                                        
    //riduce al minimo il video
    var videoelement = document.getElementById('videoscalabile');
    //sostituisce la sorgente con l'inversa
    var sourceMP4element = videoelement.querySelector('source');
    sourceMP4element.remove();
    sourceMP4element = document.createElement('source'); 
    sourceMP4element.type = 'video/mp4';
    sourceMP4element.src = 'img/4provincealla-1.mp4';
    videoelement.appendChild(sourceMP4element);
    //toglie l'hyperlink da sopra il video
    document.getElementById('chiude').remove();
    //avvia il video
    videoelement.load(); 
    videoelement.addEventListener('loadeddata', function() {videoelement.play();});
    //lo restringe e lo sostituisce nella colonna di sinistra
    videoelement.addEventListener("ended",
                                  function() {videoelement.classList.replace('scale-in','scale-out');
                                              var divelement = document.getElementById('colonna1');
                                              divelement.replaceChildren(htmlelement);
                                             },
                                   true
                                  );
    //rimette a posto il testo
    rimpiazzaTestoConLinks(document.getElementById('quattroprovince'),
                           {' (mentre ': ', o ',
                            ').': '.'                           
                           }
                          );
    //rimette a posto il link
    e.currentTarget.setAttribute('onclick', 'splash4province(event);');
    e.currentTarget.innerHTML = 'apri un veloce zoom sulle quattro province';
   }
   
function risistemadachiude(e) {
    //ricrea l'elemento HTML di contatto, inverte il video, gli toglie l'hyperlink da sopra, esegue il video invertito e lo sostituisce alla colonna di sinistra, rimette a posto il testo, rimette a posto il link
    //ricrea l'elemento HTML di contatto che era andato distrutto
    var htmlelement = document.createElement('div');    
    htmlelement.innerHTML+=`<h5 class="white-text">Contatti</h5>
                            <ul>
                             <li class="white-text">Apicoltura bell\'Italia<br>Alberto Massocchi<br>Via per Casteggio 38<br>Montebello della Battaglia (PV)</li>
                             <li class="white-text">tel. <a href="tel:0039038382619" class="brown-text text-lighten-3">+39038382619</a></li>
                             <li class="white-text">cell. <a href="tel:00393356895071" class="brown-text text-lighten-3">+393356895071</a></li>
                             <li class="white-text">email <a href="mailto:alberto.massocchi@gmail.com?subject=Apicoltura bell\'Italia" target="_blank" class="brown-text text-lighten-3">alberto.massocchi@gmail.com</a></li>
                           </ul>
                           `;                                                        
    //riduce al minimo il video
    var videoelement = document.getElementById('videoscalabile');
    //sostituisce la sorgente con l'inversa
    var sourceMP4element = videoelement.querySelector('source');
    sourceMP4element.remove();
    sourceMP4element = document.createElement('source'); 
    sourceMP4element.type = 'video/mp4';
    sourceMP4element.src = 'img/4provincealla-1.mp4';
    videoelement.appendChild(sourceMP4element);
    //toglie l'hyperlink da sopra il video
    e.currentTarget.remove();
    //l'avvia
    videoelement.load(); 
    videoelement.addEventListener('loadeddata', function() {videoelement.play();});
    //lo restringe e lo sostituisce nella colonna di sinistra
    videoelement.addEventListener("ended",
                                  function() {videoelement.classList.replace('scale-in','scale-out');
                                              var divelement = document.getElementById('colonna1');
                                              divelement.replaceChildren(htmlelement);
                                             },
                                   true
                                  );
    //rimette a posto il testo
    rimpiazzaTestoConLinks(document.getElementById('quattroprovince'),
                           {' (mentre ': ', o ',
                            ').': '.'                           
                           }
                          );
    //rimette a posto il link
    var linkelement = document.getElementById('splash');
    linkelement.setAttribute('onclick', 'splash4province(event);');
    linkelement.innerHTML = 'apri un veloce zoom sulle quattro province';
   }   
   