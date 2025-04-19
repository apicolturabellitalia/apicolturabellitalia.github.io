//initialize sidenav
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems, { //specify options here
                                            }
                                    );
});

//initialize parallax
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.parallax');
    const instances = M.Parallax.init(elems, { //specify options here
                                             }
                                     );
  });

//initialize collapsible
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.collapsible');
    const instances = M.Collapsible.init(elems, { //specify options here
                                                }
                                         );
  });

//show div id cookiepolicy as modal (initialize modal for cookiepolicy)
document.addEventListener('DOMContentLoaded', function () {
    const elems = document.getElementById('cookiepolicy');
    const instances = M.Modal.init(elems, {dismissible: false
                                          }
                                  );
    instances.open();
  });

//initialize modal except cookiepolicy
document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('.modal:not(#cookiepolicy)');
    const instances = M.Modal.init(elems, {dismissible: false,
                                           onCloseEnd: function (el) {//clona l'elemento, lo rimuove e mette al suo posto il clone
                                                                      const elparent = el.parentNode;
                                                                      const elclone = el.cloneNode(true); 
                                                                      elparent.removeChild(el);       
                                                                      elparent.appendChild(elclone);   
                                                                      //eeinizializza il modal sul clone ricollegando la stessa funzione
                                                                      M.Modal.init(elclone, {dismissible: false,
                                                                                             onCloseEnd: arguments.callee 
                                                                                            }
                                                                                  )
                                                                     }
                                           }                                                                                                                         
                                  );
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
    videoelement.dataset.caption = 'Montebello della Battaglia è un po\' a nord ovest';
    var sourceMP4element = document.createElement('source'); 
    sourceMP4element.type = 'video/mp4';
    sourceMP4element.src = 'img/4province.mp4';
    videoelement.appendChild(sourceMP4element);
    //crea l'hyperlink di chiusura non visibile e posizionato al centro del blocco
    var linkelement = document.createElement('a');
    linkelement.id = 'chiude';
    linkelement.href = '#!';
    linkelement.className = 'indigo-text text-darken-4 Heading h2';
    linkelement.setAttribute('onclick', 'viasplash4province(event);');
    linkelement.innerText = 'qui puoi chiudere lo zoom';
    linkelement.style='font-size:5vw; text-decoration: underline;';
    linkelement.style.position = 'absolute';
    linkelement.style.top = '50%'; 
    linkelement.style.left = '50%';
    linkelement.style.transform = 'translate(-50%, -50%)';
    linkelement.style.width = '100%';
    linkelement.style.textAlign = 'center'; 
    linkelement.style.display = 'none';
    linkelement.style.zIndex = '10'; 
    //crea un contenitore (che occupa tutta la larghezza disponibile e con altezza che dipenderà dal video) con il video e l'hyperlink
    var container = document.createElement('div');
    container.style.position = 'relative';
    container.style.display = 'inline-block';
    container.style.alignItems = 'center';
    container.style.justifyContent = "center"; 
    container.style.width = '100%'; 
    container.style.height = 'auto';
    //nel contenitore mette uno spinner per ingannare il tempo nell'attesa ...
    container.innerHTML+=`<div id="attendivideoscalabile" style="position: absolute; top: 50%; left: 50%; opacity:1; transition:opacity 0.5s ease; will-change:opacity;" class="preloader-wrapper small active">
                           <div style="border-color: #1A237E;" class="spinner-layer">
                            <div class="circle-clipper left">
                             <div style="border-color: #1A237E;" class="circle"></div>
                            </div>
                            <div class="gap-patch">
                             <div style="border-color: #1A237E;" class="circle"></div>
                            </div>
                            <div style="border-color: #1A237E;" class="circle-clipper right">
                             <div class="circle"></div>
                            </div>
                           </div>
                          </div>
                         `;                                                        
    container.appendChild(videoelement);
    container.appendChild(linkelement);
    //sostituisce il contenuto della colonna col nuovo contenitore
    var divelement = document.getElementById('colonna1');
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
           M.Materialbox.init(videoelement, { //opzioni specifiche per questo materialbox se necessarie
                                            }
                             );
           //cambia il testo sistema l'hyperlink da cui è partito per poter tornere indietro
           rimpiazzaTestoConLinks(document.getElementById('quattroprovince'),
                                  {', o ': ' (mentre ',
                                   '.': ').'           
                                  }
                                 );
           //sistema l'hyperlink da cui è partito per poter tornere indietro (e.currentTarget non va bene perché suiamo dentro timeupdate)
           var thislinkelement = document.getElementById('splash');
           thislinkelement.setAttribute('onclick', 'viasplash4province(event);');
           thislinkelement.innerHTML = 'qui puoi chiudere lo zoom';
           //rimuovi l'event listener per non eseguirlo più
           videoelement.removeEventListener('timeupdate', checkVideoTime);
          }
       }

    const spinner = document.getElementById('attendivideoscalabile');
    //imposta la velocità di riproduzione del video
    videoelement.playbackRate = 0.75;
    //imposta l'event listener per mostrare lo spinner se il video è in buffering
    videoelement.addEventListener('waiting', () => {
                                                    spinner.style.opacity = '1';
                                                   }
                                 );
    //imposta l'event Listener per nascondere lo spinner quando il video può partire
    videoelement.addEventListener('canplaythrough', () => {
                                                           spinner.style.opacity = '0';
                                                          }
                                 );
    //imposta l'event listener per bloccare il video e avvia la riproduzione controllata solo dopo che i dati sono disponibili
    videoelement.addEventListener('loadeddata', () => {
                                                       videoelement.addEventListener('timeupdate', checkVideoTime);
                                                       //avvia la riproduzione
                                                       videoelement.play().then(() => {
                                                                                       //avvia l'animazione di scaling durante la riproduzione e poi sposta la finestra di conseguenza
                                                                                       videoelement.classList.replace('scale-out', 'scale-in');
                                                                                       document.getElementById('Trovaci').scrollIntoView({ behavior: 'smooth' });
                                                                                       }
                                                                               );
                                                       }
                                 );
    //ora avvia il caricamento
    videoelement.load();
   }

function viasplash4province(e) {
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
    //toglie l'hyperlink da sopra il video
    document.getElementById('chiude').remove();
    //avvia il video dal punto in cui si era fermato mpostandone la veleocità di riproduzione
    var videoelement = document.getElementById('videoscalabile');
    videoelement.playbackRate = 1;
    //alla fine lo deve restringere e sostituirlo nella colonna di sinistra
    videoelement.addEventListener('ended',
                                  function() {videoelement.classList.replace('scale-in','scale-out');
                                              //risistema l'elemento HTML di contatto
                                              document.getElementById('colonna1').replaceChildren(htmlelement);
                                              //rimette a posto il testo e sistema l'hyperlink da cui è partito per poter ricominciare
                                              rimpiazzaTestoConLinks(document.getElementById('quattroprovince'),
                                                                     {' (mentre ': ', o ',
                                                                      ').': '.'                           
                                                                     }
                                                                    );
                                              //sistema l'hyperlink da cui è partito per poter ricominciare (e.currentTarget non va bene perché suiamo dentro ended)
                                              var thislinkelement = document.getElementById('splash');
                                              thislinkelement.setAttribute('onclick', 'splash4province(event);');
                                              thislinkelement.innerHTML = 'apri un veloce zoom sulle quattro province';
                                              //rimuovi l'event listener per non eseguirlo più
                                              videoelement.removeEventListener('ended');                                              
                                             },
                                  {capture: true, once: true}
                                 );
    videoelement.play();
   }
   
function splashrecensioni(e) {
    //impedisce il comportamento predefinito del link
    e.preventDefault();
    //impedisce la propagazione dell'evento
    e.stopPropagation();
    //rendi visibile il div
    var divelement = document.getElementById("splashrecensioni");
    divelement.style.display = "block";
    //trova il carousel dentro il div appena reso visibile e lo inizializza
    const elem = divelement.querySelector('.carousel');
    const instance = M.Carousel.init(elem, { //opzioni specifiche per questo carousel se necessarie
                                           }
                                    ); 
   }
   
function viasplashrecensioni(e) {
    document.getElementById("splashrecensioni").style="display:none;";
   }