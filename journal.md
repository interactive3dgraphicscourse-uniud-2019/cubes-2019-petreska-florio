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

Abbiamo poi speso del tempo per commentare e rendere il codice più comprensibile, anche attraverso l'utilizzo delle convenzioni di JSDoc e infine aggiunto alle gambe create una semplice animazione "walking".

Contemporaneamente abbiamo lavorato allo sviluppo della classe dell'isola. 

Abbiamo creato tre livelli, cioè i tre cubi principali che rappresentano l'isola, per i quali abbiamo usatouna texture ad alta definizione per la sabbia.

Dopodiché è stato creato un altro cubo, per rappresentare il mare, per il quale abbiamo usato un'altra texture, resa poi  trasparente (con i valori: transparent: true, opacity: 0.4).

I singoli cubi che costituiscono la palma sono fatti tramite un cubo principale e poi cambiando le posizioni ai cloni di tale cubo.

Facendo questo lavoro, abbiamo considerato che possiamo aggiungere un'animazione in più, minimale sulla palma, che dovrebbe muoversi da sinistra a destra come se fosse mossa dal vento.


## 29.03.2019
Costruzione delle braccia del naufrago con la loro gerarchia.

Costruzione di una prima versione della testa del naufrago.

![](images/complete.png)




