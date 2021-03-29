# FrontendSpecialist

Per il progetto ho deciso di adottare un'architettura con NgRX, per gestire lo stato applicativo, in quanto il mio credo è che ( visto anche il prolungato tempo di sviluppo utilizzando 
la tecnologia in questione ) partendo da una struttura definita il tempo di sviluppo sarà notevolmente ridotto, in quanto avere una linea guida da seguire agevola e snellisce le attività di manutenzione e di 
evoluzione dell'applicativo. 

Per il layout responsive mi sono aiutato con bootstrap in modo da avere facilmente accesso a tutte le classi css per un layout mobile first fino a scalare sui monitor più grandi.

Come base di appoggio dati ho usato un semplice db locale con json-server per le principali chiamate http, infatti ho simulato con un timeout i tmepi di reazione delle API perchè 
se no sarebbero state di pochi millisecondi e non si sarebbe potuto verificare ad esempio il loader.

Per la parte di testing, ho seguito quella che è la guida ufficiale google per angular, con i classici esempi base riportati

## Development server

comando "start": "ng serve" per il server frontend
comando "server": "json-server --watch server/db.json" per la istanza db locale
comando "test": "ng test" per la parte di testing
