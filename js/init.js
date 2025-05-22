//lo splash per le recensioni contiene l'area del bottone di chiusura, con una mappa la rendiamo cliccabile e responsive
let buttonchiudi;
let mapcompleta;
function aggiornacoordinatebottone() {
    const basewidthrectmapcompleta = 332;
    const baseheightrectmapcompleta = 240;
    const basecenterXbuttonchiudi = 309;
    const basecenterYbuttonchiudi = 216;
    const baseradiusbuttonchiudi = 16;
    const rectmapcompleta = mapcompleta.getBoundingClientRect();
    const widthmapcompleta = rectmapcompleta.width;
    const heightmapcompleta = rectmapcompleta.height;
    //calcola i nuovi centro e raggio per il bottone
    const scaleX = widthmapcompleta / basewidthrectmapcompleta;
    const scaleY = heightmapcompleta / baseheightrectmapcompleta;
    const nuovocenterXbuttonchiudi = basecenterXbuttonchiudi * scaleX;
    const nuovocenterYbuttonchiudi = basecenterYbuttonchiudi * scaleY;
    const nuovoradiusbuttonchiudi = baseradiusbuttonchiudi * Math.min(scaleX, scaleY);
    //imposta i nuovi centro e raggio per il bottone
    buttonchiudi.coords = `${Math.round(nuovocenterXbuttonchiudi)},${Math.round(nuovocenterYbuttonchiudi)},${Math.round(nuovoradiusbuttonchiudi)}`;
   }

//mantiene aggiornate le coordinate del bottone di chiusura
document.addEventListener('DOMContentLoaded',
                          function() {
                              mapcompleta = document.querySelector('img[usemap="#bottone_chiudi_splashrecensioni_map"]');
                              const mapbuttonchiudi = document.querySelector('map[name="bottone_chiudi_splashrecensioni_map"]');
                              buttonchiudi = mapbuttonchiudi.querySelector('area[shape="circle"]');
                              //aggiorna le coordinate del bottone di chiusura al caricamento dello splash per le recensioni
                              mapcompleta.addEventListener('load',
                                                           aggiornacoordinatebottone
                                                          );
                              //aggiorna le coordinate del bottone di chiusura dello splash per le recensioni quando la finestra viene ridimensionata
                              window.addEventListener('resize',
                                                      aggiornacoordinatebottone
                                                     );
                             }
                         );

//initialize sidenav
document.addEventListener('DOMContentLoaded',
                          function() {
                              const elems = document.querySelectorAll('.sidenav');
                              const instances = M.Sidenav.init(elems,
                                                               { //specify options here
                                                               }
                                                              );
                             }
                         );

//initialize parallax
document.addEventListener('DOMContentLoaded',
                          function() {
                              const elems = document.querySelectorAll('.parallax');
                              const instances = M.Parallax.init(elems,
                                                                { //specify options here
                                                                }
                                                               );
                             }
                         );

//show div id cookiepolicy as modal (initialize modal for cookiepolicy)
document.addEventListener('DOMContentLoaded',
                          function () {
                              const elem = document.getElementById('cookiepolicy');
                              const instance = M.Modal.init(elem,
                                                            {dismissible: false
                                                            }
                                                           );
                              instance.open();
                             }
                         );

//initialize modal except cookiepolicy
document.addEventListener('DOMContentLoaded',
                          function () {
                              const elems = document.querySelectorAll('.modal:not(#cookiepolicy)');
                              const instances = M.Modal.init(elems,
                                                             {dismissible: false,
                                                              onCloseEnd: function (el) {
                                                                              //clona l'elemento, lo rimuove e mette al suo posto il clone
                                                                              const elparent = el.parentNode;
                                                                              const elclone = el.cloneNode(true); 
                                                                              elparent.removeChild(el);       
                                                                              elparent.appendChild(elclone);   
                                                                              //reinizializza il modal per il clone collegandovi la stessa funzione
                                                                              M.Modal.init(elclone,
                                                                                           {dismissible: false,
                                                                                            onCloseEnd: arguments.callee 
                                                                                           }
                                                                                          );
                                                                             }
                                                             }                                                                                                                         
                                                            );
                             }
                         );

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
           if (sostituzioni[testoOriginale]) {textnode.textContent = unescape(sostituzioni[testoOriginale]);}
          }
          //se il nodo è un <a> non fa nulla
          else if (textnode.nodeType === Node.ELEMENT_NODE && textnode.tagName === 'A') {}
       }
   }

//funzione generalizzata per il render di testo con caratteri speciali che quindi va composto con HTML entity e HTML special character
function decodificaHtml(html) {
    const testoconhtmlentity = document.createElement('textarea');
    testoconhtmlentity.innerHTML = html;
    const testo = testoconhtmlentity.value;
    testoconhtmlentity.remove();
    return testo;
   }

let colonna1clone;
let quattroprovinceclone;
function splash4province(e) {
    //crea l'elemento video ridotto al minimo e il link di chiusura, li sostituisce alla colonna di sinistra, allarga il video, lo avvia e inizializza l'elemento per javascript, cambia il testo per segnalare come tornare, cambia il link per tornare
    //crea un contenitore che occupa tutta la larghezza disponibile e con altezza che dipenderà dal wrapper
    var container = document.createElement('div');
    container.style.width = '100%'; 
    container.style.display = 'flex';
    container.style.justifyContent = 'flex-start';
    //crea un wrapper con larghezza del video per inserirvi video, link e spinner
    var wrappervideolinkspinner = document.createElement('div');
    wrappervideolinkspinner.style.position = 'relative';
    wrappervideolinkspinner.style.display = 'inline-block';
    wrappervideolinkspinner.style.verticalAlign = 'top';
    //crea il video ridotto al minimo 
    var videoelement = document.createElement('video');
    videoelement.id = 'videoscalabile';
    videoelement.className = 'materialboxed responsive-video scale-transition scale-out';
    videoelement.alt = 'Zoom sulle quattro province';
    videoelement.dataset.caption = decodificaHtml('Montebello della Battaglia &egrave; un po&rsquo; a nord ovest');
    videoelement.disablePictureInPicture = true;
    videoelement.style.display = 'block';
    videoelement.style.width = '100%';
    videoelement.style.height = 'auto';
    var sourceMP4element = document.createElement('source');
    sourceMP4element.type = 'video/mp4';
    sourceMP4element.src = 'img/4province.mp4';
    videoelement.appendChild(sourceMP4element);
    //crea l'hyperlink di chiusura non visibile e posizionato al centro del blocco
    var linkelement = document.createElement('a');
    linkelement.id = 'chiude';
    linkelement.href = 'javascript:undefined';
    linkelement.className = 'indigo-text text-darken-4';
    linkelement.setAttribute('onclick', 'viasplash4province(event);');
    linkelement.innerText = 'qui puoi chiudere lo zoom';
    linkelement.style.fontSize = '5vw';
    linkelement.style.textDecoration = 'underline';
    linkelement.style.position = 'absolute';
    linkelement.style.top = '50%'; 
    linkelement.style.left = '50%';
    linkelement.style.transform = 'translate(-50%, -50%)';
    linkelement.style.width = '100%';
    linkelement.style.textAlign = 'center'; 
    linkelement.style.display = 'none';
    linkelement.style.zIndex = '10'; 
    //crea uno spinner materialize sopra tutto per ingannare il tempo nell'attesa ...
    var materializespinner = document.createElement('div');
    materializespinner.id = 'attendivideoscalabile';
    materializespinner.className = 'preloader-wrapper small active';
    materializespinner.style.position = 'absolute';
    materializespinner.style.top = '50%';
    materializespinner.style.left = '50%';
    //materializespinner.style.transform = 'translate(-50%, -50%)';
    materializespinner.style.opacity = '1';
    materializespinner.style.transition = 'opacity 0.5s ease';
    materializespinner.style.willChange = 'opacity';
    materializespinner.style.zIndex = '20';
    materializespinner.innerHTML = `<div style="border-color:#1A237E;" class="spinner-layer">
                                     <div class="circle-clipper left">
                                      <div style="border-color:#1A237E;" class="circle"></div>
                                     </div>
                                     <div class="gap-patch">
                                      <div style="border-color:#1A237E;" class="circle"></div>
                                     </div>
                                     <div class="circle-clipper right">
                                      <div class="circle"></div>
                                     </div>
                                    </div>`;
    //sistema video, link e spinner nel wrapper
    wrappervideolinkspinner.appendChild(videoelement);
    wrappervideolinkspinner.appendChild(linkelement);
    wrappervideolinkspinner.appendChild(materializespinner);
    //il container contiene solo il wrapper
    container.appendChild(wrappervideolinkspinner);
    //sostituisce il contenuto della colonna di sinistra, dopo averla clonata, col nuovo contenitore
    var divelement = document.getElementById('colonna1');
    colonna1clone = divelement.cloneNode(true);
    divelement.replaceChildren(container);
    //il video ha 98 frame, la proiezione si deve fermare a metà (49)
    const videotargetframe = 49; 
    const videofps = 30;
    //questo è il tempo assoluto in secondi a cui il video si deve fermare (circa 1.6333)
    const videostoptime = videotargetframe / videofps;

    //funzione handler per l'evento timeupdate che controlla la riproduzione
    function checkVideoTime() {
        // Controlla se il tempo corrente ha superato o raggiunto il target
        if (videoelement.currentTime >= videostoptime) {
           videoelement.pause();
           //per sicurezza: aggiunge precisione
           videoelement.currentTime = videostoptime;
           //mostra l'hyperlink
           linkelement.style.display = 'block';
           //inizializza l'elemento per il materialbox
           M.Materialbox.init(videoelement,
                              { //opzioni specifiche per questo materialbox se necessarie
                              }
                             );
           //cambia il testo e sistema l'hyperlink da cui è partito per poter tornere indietro, dopo aver clonato lo span
           //cambia il testo dopo aver clonato l'elemento
           var spanelement = document.getElementById('quattroprovince');
           quattroprovinceclone = spanelement.cloneNode(true);
           rimpiazzaTestoConLinks(spanelement,
                                  {', o ': ' (mentre ',
                                   '.': ').'           
                                  }
                                 );
           //sistema l'hyperlink da cui è partito per poter tornere indietro (e.currentTarget non va bene perché siamo dentro timeupdate)
           var thislinkelement = document.getElementById('splash');
           thislinkelement.setAttribute('onclick', 'viasplash4province(event);');
           thislinkelement.innerHTML = 'qui puoi chiudere lo zoom';
           //rimuove l'event listener per non eseguirlo più
           videoelement.removeEventListener('timeupdate',
                                            checkVideoTime
                                           );
          }
       }

    //imposta la velocità di riproduzione del video
    videoelement.playbackRate = 0.75;
    //imposta l'event listener per mostrare lo spinner se il video è in buffering
    videoelement.addEventListener('waiting',
                                  () => {materializespinner.style.opacity = '1';}
                                 );
    //imposta l'event listener per bloccare il video e avvia la riproduzione controllata solo dopo che i dati sono disponibili
    videoelement.addEventListener('loadeddata',
                                  () => {
                                         videoelement.addEventListener('timeupdate',
                                                                       checkVideoTime
                                                                      );
                                         //avvia la riproduzione
                                         videoelement.play().then(() => {
                                                                         //avvia l'animazione di scaling durante la riproduzione e poi sposta la finestra di conseguenza
                                                                         videoelement.classList.replace('scale-out', 'scale-in');
                                                                         document.getElementById('Trovaci').scrollIntoView({behavior: 'smooth'});
                                                                        }
                                                                  );
                                        }
                                 );
    //imposta l'event Listener per nascondere lo spinner quando il video può partire senza strappi
    videoelement.addEventListener('canplaythrough',
                                  () => {materializespinner.style.opacity = '0';}
                                 );
    //ora avvia il caricamento
    videoelement.load();
   }

function viasplash4province(e) {
    //toglie l'hyperlink da sopra il video, continua il video e poi lo restringe e vi sostituisce la colonna di sinistra, rimette a posto lo span
    //toglie l'hyperlink da sopra il video
    document.getElementById('chiude').remove();
    //avvia il video dal punto in cui si era fermato mpostandone la veleocità di riproduzione
    var videoelement = document.getElementById('videoscalabile');
    videoelement.playbackRate = 1;
    //alla fine lo deve restringere e sostituirlo nella colonna di sinistra
    videoelement.addEventListener('ended',
                                  function() {
                                      videoelement.classList.replace('scale-in','scale-out');
                                      //risistema la colonna di sinistra
                                      document.getElementById('colonna1').replaceWith(colonna1clone);
                                      //risistema lo span
                                      document.getElementById('quattroprovince').replaceWith(quattroprovinceclone);
                                      //rimuove l'event listener per non eseguirlo più
                                      videoelement.removeEventListener('ended');                                              
                                     },
                                  {capture: true, once: true}
                                 );
    videoelement.play();
   }
   
function splashrecensioni(e) {
    //rende visibile il div 
    document.getElementById('splashrecensioni').style.display = 'block';
    //inizializza il carousel dentro il div appena reso visibile
    const elem = document.getElementById('carouselrecensioni');
    const instance = M.Carousel.init(elem,
                                     { //opzioni specifiche per questo carousel se necessarie
                                     }
                                    );
    //sposta la finestra di conseguenza e aggiorna le coordinate del bottone di chiusura
    document.getElementById('Prodotti').scrollIntoView({behavior: 'smooth'});
    aggiornacoordinatebottone();
   }
   
function viasplashrecensioni(e) {
    document.getElementById('splashrecensioni').style='display:none;';
   }
