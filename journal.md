## 26.03.2019
### Idea
Impostato il progetto in locale, abbiamo pensato a cosa fare concretamente. 

L'idea di base è la seguente:
- la scena è un'isola nel mare con un naufrago
- l'animazione consiste nel naufrago che si sbraccia per chiedere aiuto

Bonus (se c'è tempo, in ordine sparso)
- aggiunta di texture sul vestito del naufrago
- un elicottero che recupera il naufrago
- aggiunta del suono per il naufrago che grida aiuto

### Primi schizzi
Con il programma MagicaVoxel ci siamo fatte un'idea della forma che potrebbero avere gli elementi della scena (isola con la palma e naufrago).

![](images/island.png)
![](images/castaway.png)


Per il naufrago che deve essere animato abbiamo creato un albero che rappresenta le dipendenze tra le varie parti del suo corpo, evidenziando le articolazioni e le parti che, dunque, dovranno essere collegate tra loro per gestire in maniera corretta l'ordine delle rotazioni e delle traslazioni.

![](images/char-tree.png)

## 27.03.2019
Analizziamo la possibilità di strutturare il progetto in classi per gli oggetti della scena (naufrago e isola) per una maggiore leggibilità del codice e una più facile divisione del lavoro.

Fatta una piccola prova del funzionamento delle classi in JavaScript (ES6), decidiamo di intraprendere quella strada.

Riorganizzazione della cartella suddividendo i file con la struttura seguente:

```
cubes-2019-petreska-florio
|
├── css/
|
├── ignores/
|   
├── js/
|   |
|   ├── imports/   
|   |
|   ├── lib/   
|   |
|   └── main.js 
|
├── textures/
|
└── index.html
```

dove il codice del file HTML è stato suddiviso in `index.html`, `css/main.css` e gli script sono stati inseriti in `js/`: in `js/lib` si trovano le librerie esterne, in `js/imports` saranno salvate le classi dove vengono definiti gli oggetti della scena e `main.js` è il file con gli script `Start()` e `Update()`

Decidiamo anche di lavorare su diversi branch, in un primo momento pensiamo di crearne uno per il naufrago e uno per l'isola.

## 28.03.2019
Sviluppo della classe del naufrago. A partire dalle gambe si costruirà tutto il corpo del naufrago, così che il prima possibile si possa avere una struttura animabile.

Abbiamo creato un metodo apposito per creare una coppia articolazione-osso, che sarà poi utilizzato per creare i nodi dell'albero deciso il 26.03.

Abbiamo poi creato i primi tre nodi: caviglia, ginocchio e anca. 
Duplicazione della gamba.

Ad ogni nuova creazione aggiungiamo un'animazione per essere sicuri che le gerarchie funzionino come pensato.

![](images/legs.png)

Abbiamo poi speso del tempo per commentare e rendere il codice più comprensibile, anche attraverso l'utilizzo delle convenzioni di JSDoc e infine aggiunto alle gambe create una semplice animazione "walkAnimation".

Contemporaneamente abbiamo lavorato allo sviluppo della classe dell'isola. 

Abbiamo creato tre livelli, cioè i tre cubi principali che rappresentano l'isola, per i quali abbiamo usatouna texture ad alta definizione per la sabbia.

Dopodiché è stato creato un altro cubo, per rappresentare il mare, per il quale abbiamo usato un'altra texture, resa poi  trasparente (con i valori: transparent: true, opacity: 0.4).

I singoli cubi che costituiscono la palma sono fatti tramite un cubo principale e poi cambiando le posizioni ai cloni di tale cubo.

![](images/island.jpg)

Facendo questo lavoro, abbiamo considerato che possiamo aggiungere un'animazione in più, minimale sulla palma, che dovrebbe muoversi da sinistra a destra come se fosse mossa dal vento.

Abbiamo anche pensato ad ingrandire la spiaggia con un livello in più per dare più spazio al personaggio.


## 29.03.2019
Costruzione delle braccia del naufrago con la loro gerarchia.

Costruzione di una prima versione della testa del naufrago.

![](images/complete.png)

Cambiamento dei materiali del naufrago per interagire con le luci

![](images/material.png)


## 02.04.2019 

Raffinatura e pulizia del codice.
Abbiamo creato due classi diversi, una per l'isola e l'altra per la palma.

Migliorata la palma aggiungendo i blocchi mancanti. Abbiamo fatto cambiamenti sull'ombra e abbiamo reso il mare più grande per dare meglio l'idea che si tratta di un'isola deserta in mezzo al mare.

Dopodichè abbiamo unito la figura del naufrago con la scena dell'isola e la palma. Con questa modifica siamo state costrette a cambiare le dimensioni dal naufrago e dall'isola per adattarsi insieme.

È stato deciso quali compiti futuri dovremmo svolgere per migliorare e completare questo progetto. Ed è stato discusso come procedere ulteriormente con la creazione e la modifica del video.
![](images/island0.png)

## 03.04.2019

Ulteriore implementazione del terreno, creazione di nuovi cubi su ogni livello dell'isola, per dare l'aspetto dell'isola simile al nostro primo design in MagicaVoxel.
![](images/island1.png)


Progetto leggermente in stallo per 3 giorni causa 1/2 del team abbattuto dall'influenza.

## 06.04.2019

Implementazione del fuoco sull'isola ed i sassi nel mare.

Aggiunta animazione del naufrago che agita le braccia per chiedere aiuto. Qualche difficoltà con le rotazioni delle ossa, ma la precedente progettazione dei pivot ha aiutato molto nel lavorare con ogni articolazione.


![](images/fire&searocks.png)


Conclusa l'animazione delle braccia è stato definito un piccolo loop nel quale il naufrago gira intorno all'isola e ad ogni angolo si sbraccia per chiedere aiuto, utilizzando le callback functions di JavaScript.

Infine è stata utilizzata la classe delle rocce marine per crearne 4 in 4 posti diversi.

Decisione di concludere qui la parte da consegnare e dedicarsi a post processing del video di presentazione.

Video post-processing con il software Shotcut, che è uno strumento libero per il montaggio video digitale. Abbiamo usato un audio con le onde del mare e la vocina del naufrago che grida "Help!". 

## 07.04.2019

E' stato creato un video in anteprima per mostrare il risultato a 60FPS e con un basilare inserimento audio attraverso il programma VSDC Video Editor. Le clip sono state reperite dal sito freesound.org.

E' stata creata la relazione conclusiva.

![](images/video.png)

## 11.04.2019

E' stato commentato il codice della classe Castaway per renderlo più leggibile e meglio utilizzabile. Approfittato per rileggere il codice e togliere alcune parti inutili o mal strutturate.

Inoltre è stata provata l'estensione da parte delle nostre classi della classe Mesh per operare funzioni della classe Mesh come il clone(). La prova è stata fatta sulle rocce ed ha avuto successo, in quanto sono state clonate e poi spostate nelle nuove posizioni senza problemi.

Tentativo di riservare lo stesso trattamento alla classe del naufrago, non andato altrettanto bene, in quanto il naufrago ha una struttura più complessa e utilizza delle variabili locali che non permettono l'estensione immediata come nella classe SeaRocks.

In sospeso in attesa di ulteriori approfondimenti.

## 13-14.04.2019   
Inserimento degli effetti sonori all'interno dell'applicazione stessa. 

La musica calypso di sottofondo viene eseguita in loop ed è ambientale, mentre il naufrago che chiede aiuto ha la voce direzionale proveniente dalla testa.

I suoni si possono mettere in pausa grazie ad un pulsante in alto a destra.

## 15.04.2019  
Inserimento di movimenti di camera preimpostati per facilitare la registrazione di un nuovo video di presentazione a 60 fps.

Risoluzione di alcuni warning riguardanti principalmente le texture:
- dimensioni rese quadrate e a 256x256
- cambio del metodo di caricamento da loadTexture (deprecato) a new TextureLoader().load()






