import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen p-6 text-white ">
      <div className="max-w-4xl mx-auto shadow-md rounded-lg overflow-hidden bg-zinc-950">
        {/* Header */}
        <div className="p-6 bg-yellow-100 text-red-500 text-center">
          <h1 className="text-3xl font-bold">Contattaci</h1>
          <p className="text-lg">Star Turkish Pizza Kebap</p>
        </div>

        {/* Informações de Contato */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Informazioni di Contatto</h2>
          <p className="text-lg mb-2">
            <strong>Indirizzo:</strong> Via Guglielmo Jervis, 2, 10015 Ivrea TO
          </p>
          <p className="text-lg mb-2">
            <strong>Telefono:</strong> <a href="tel:+393240560356" className="text-blue-600">324 056 0356</a>
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
          <h2 className="text-2xl font-bold mb-4">Cosa Dicono i Nostri Clienti</h2>
          <div className="space-y-4">
            {/* Testimoni 1 */}
            <div className="p-4 bg-gray-950 rounded-lg">
              <p className="text-lg">&ldquo;La miglior pizza che abbia mai mangiato! Il servizio è impeccabile e l&lsquo;atmosfera è fantastica.&ldquo;</p>
              <p className="text-right text-sm text-gray-600">- Mario Rossi</p>
            </div>
            {/* Testimoni 2 */}
            <div className="p-4 bg-gray-950 rounded-lg">
              <p className="text-lg">&ldquo;Ottimo cibo e personale cordiale. Tornerò sicuramente!&ldquo;</p>
              <p className="text-right text-sm text-gray-600">- Laura Bianchi</p>
            </div>
            {/* Aggiunge piu se necessario */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
