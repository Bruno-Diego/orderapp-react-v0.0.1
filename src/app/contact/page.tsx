import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ContactPage = () => {
  return (
    <div className="min-h-screen p-6 text-white ">
      <div className="max-w-4xl mx-auto shadow-md rounded-lg overflow-hidden bg-zinc-950">
        {/* Header */}
        <div className="p-6 bg-yellow-100 text-red-500 text-center">
          <h1 className="text-3xl font-bold">Contattaci</h1>
          <p className="text-lg">Star Turchis Pizza Kebap</p>
        </div>

        {/* Informações de Contato */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Informazioni di Contatto</h2>
          <p className="text-lg mb-2">
            <strong>Indirizzo:</strong> Via Guglielmo Jervis, 2, 10015 Ivrea TO
          </p>
          <p className="text-lg mb-2">
            <strong>Telefono:</strong>{" "}
            <a href="tel:+393240560356" className="text-blue-600">
              324 056 0356
            </a>
          </p>

          {/* Horário de Funcionamento */}
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Orario di Apertura:</h3>
            <ul className="list-disc pl-5">
              <li>Lunedì: 11:00 - 00:00</li>
              <li>Martedì: 11:00 - 00:00</li>
              <li>Mercoledì: 11:00 - 00:00</li>
              <li>Giovedì (Assunzione di Maria Vergine): 11:00 - 00:00</li>
              <li>Venerdì: 11:00 - 05:00</li>
              <li>Sabato: 11:00 - 01:00</li>
              <li>Domenica: 11:00 - 00:00</li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              L&lsquo;orario di apertura può variare durante le festività.
            </p>
          </div>
        </div>

        {/* Politica Privacy */}
        <div className="my-0">
          <p className="px-6 mt-0 text-sm text-gray-500">
            Utilizziamo cookie per migliorare la tua esperienza. Continuando,
            accetti l&lsquo;uso dei cookie. Leggi la nostra:
            <br />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Politica di Privacy</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[425px] max-h-[425px] overflow-auto">
                <div className="text-white">
                  Politica di Privacy 
                  <br />
                  1. Introduzione La presente Politica di
                  Privacy descrive come raccogliamo, utilizziamo e proteggiamo i
                  tuoi dati personali quando accedi e utilizzi il nostro webapp
                  per effettuare ordini di pizza, kebab e altri prodotti. Ci
                  impegniamo a garantire che i tuoi dati siano trattati nel
                  rispetto della normativa italiana ed europea sulla protezione
                  dei dati personali (GDPR). 2. Titolare del Trattamento Il
                  titolare del trattamento dei dati è STAR TURKISH PIZZA KEBAB
                  DI SIYAHTURP SAHIN, con sede legale in VIA GUGLIELMO JERVIS 3
                  - 10015 - IVREA (TO). Per qualsiasi domanda riguardante questa
                  Politica di Privacy, puoi contattarci telefonicamente al +39
                  324 056 0356. 3. Dati Raccolti Raccogliamo i seguenti dati
                  personali quando utilizzi il nostro webapp: Dati di
                  registrazione: Nome, cognome, indirizzo email, numero di
                  telefono, e credenziali di accesso (nome utente e password).
                  Dati di pagamento: Dati della carta di credito (tramite
                  piattaforme di pagamento sicure, non conserviamo queste
                  informazioni). Dati di consegna: Indirizzo di consegna,
                  informazioni sul metodo di consegna preferito. Dati relativi
                  agli ordini: Dettagli degli ordini effettuati, preferenze
                  alimentari. Dati tecnici: Informazioni sull’utilizzo del
                  webapp, come l’indirizzo IP, il tipo di browser, il sistema
                  operativo, e cookie (vedi sezione 7 per maggiori dettagli sui
                  cookie). 4. Finalità del Trattamento Utilizziamo i tuoi dati
                  personali per le seguenti finalità: Gestione degli ordini: Per
                  elaborare e consegnare i tuoi ordini, incluse eventuali
                  comunicazioni relative allo stato dell’ordine. Pagamenti: Per
                  gestire i pagamenti tramite fornitori di servizi di pagamento
                  sicuri. Comunicazioni: Per contattarti riguardo a domande,
                  problemi o aggiornamenti relativi ai tuoi ordini.
                  Miglioramento del servizio: Per analizzare come viene
                  utilizzato il nostro webapp e migliorare la tua esperienza
                  utente. Marketing e promozioni: Con il tuo consenso, potremmo
                  inviarti comunicazioni promozionali e offerte speciali via
                  email o SMS. Puoi disiscriverti in qualsiasi momento. 5. Base
                  Giuridica del Trattamento Raccogliamo e trattiamo i tuoi dati
                  personali solo quando abbiamo una base giuridica valida, che
                  può includere: Esecuzione del contratto: I tuoi dati sono
                  necessari per la gestione e l’esecuzione dei tuoi ordini.
                  Consenso: Per finalità di marketing e invio di offerte
                  promozionali, tratteremo i tuoi dati solo con il tuo consenso
                  esplicito. Obblighi legali: Possiamo trattare i tuoi dati per
                  adempiere a obblighi di legge o regolamentari. 6. Condivisione
                  dei Dati I tuoi dati personali non saranno condivisi con terze
                  parti, salvo nei seguenti casi: Fornitori di servizi di
                  pagamento: Per elaborare i pagamenti online tramite fornitori
                  di servizi sicuri. Corrieri e servizi di consegna: Per
                  assicurare che il tuo ordine venga consegnato all&lsquo;indirizzo
                  corretto. Autorità competenti: Se richiesto dalla legge o per
                  rispondere a procedure legali valide. Non vendiamo né
                  condividiamo i tuoi dati personali per scopi di marketing a
                  terzi. 7. Cookie e Tecnologie Simili Il nostro webapp utilizza
                  cookie e tecnologie simili per migliorare la tua esperienza e
                  raccogliere informazioni su come viene utilizzato il nostro
                  sito. I cookie sono piccoli file di testo che vengono
                  memorizzati sul tuo dispositivo. Puoi gestire le preferenze
                  sui cookie direttamente tramite le impostazioni del browser.
                  Tipi di cookie che utilizziamo: Cookie tecnici: Necessari per
                  il funzionamento del sito e per garantire una corretta
                  esperienza utente. Cookie analitici: Utilizzati per
                  raccogliere dati sull’utilizzo del sito in forma anonima, per
                  migliorare i nostri servizi. 8. Conservazione dei Dati I tuoi
                  dati personali saranno conservati per il tempo necessario a
                  soddisfare le finalità per cui sono stati raccolti, in
                  conformità con la normativa applicabile. I dati relativi agli
                  ordini saranno conservati per i periodi previsti dalla legge
                  in materia fiscale e commerciale. 9. Diritti degli Interessati
                  Hai il diritto di accedere, correggere, cancellare o limitare
                  il trattamento dei tuoi dati personali. Puoi anche opporti al
                  trattamento e richiedere la portabilità dei tuoi dati. Per
                  esercitare questi diritti, contattaci. Se ritieni che il
                  trattamento dei tuoi dati violi il GDPR, hai il diritto di
                  presentare un reclamo presso l&lsquo;autorità di controllo italiana
                  (Garante per la Protezione dei Dati Personali). 10. Sicurezza
                  dei Dati Adottiamo misure di sicurezza tecniche e
                  organizzative adeguate per proteggere i tuoi dati personali da
                  accessi non autorizzati, perdite o distruzioni. I dati di
                  pagamento vengono trattati attraverso fornitori di servizi
                  certificati per garantire la massima sicurezza. 11. Modifiche
                  alla Politica di Privacy Ci riserviamo il diritto di
                  modificare questa Politica di Privacy in qualsiasi momento. Le
                  modifiche saranno pubblicate su questa pagina e, se rilevanti,
                  ti informeremo tramite email o notifica nel webapp. Ti
                  consigliamo di consultare periodicamente questa pagina per
                  rimanere aggiornato. 12. Contatti Per qualsiasi domanda o
                  richiesta riguardante questa Politica di Privacy, puoi
                  contattarci al +39 324 056 0356.
                </div>
              </DialogContent>
            </Dialog>
          </p>
        </div>

        {/* Google Maps */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">La Nostra Posizione</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2776.114028177063!2d7.874859775352934!3d45.46911913789466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47889a765b5dc787%3A0x7e68ed3fa87cf2fd!2sVia%20Guglielmo%20Jervis%2C%202%2C%2010015%20Ivrea%20TO%2C%20Italy!5e0!3m2!1sen!2sus!4v1694451555403!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>

        {/* Testimoni */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            Cosa Dicono i Nostri Clienti
          </h2>
          <div className="space-y-4">
            {/* Testimoni 1 */}
            <div className="p-4 bg-gray-950 rounded-lg">
              <p className="text-lg">
                &ldquo;La miglior pizza che abbia mai mangiato! Il servizio è
                impeccabile e l&lsquo;atmosfera è fantastica.&ldquo;
              </p>
              <p className="text-right text-sm text-gray-600">- Mario Rossi</p>
            </div>
            {/* Testimoni 2 */}
            <div className="p-4 bg-gray-950 rounded-lg">
              <p className="text-lg">
                &ldquo;Ottimo cibo e personale cordiale. Tornerò
                sicuramente!&ldquo;
              </p>
              <p className="text-right text-sm text-gray-600">
                - Laura Bianchi
              </p>
            </div>
            {/* Aggiunge piu se necessario */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
