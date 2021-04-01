var DOMAIN = 'wissenaire.org';
var mailgun = require('mailgun-js')({ apiKey: "6989322582937f8744a827075fdd2f18-1553bd45-def4c808", domain: DOMAIN });
var MailComposer = require('nodemailer/lib/mail-composer');

var mailOptions = {
  from: 'events@wissenaire.org',
  to: 'no-reply@wissenaire.org',
  subject: 'Hello',
  text: 'Pora rey'
};

var mail = new MailComposer(mailOptions);

mail.compile().build(function(mailBuildError, message) {

    var dataToSend = {
        to: 'no-reply@wissenaire.org',
        message: message.toString('ascii')
    };

    mailgun.messages().sendMime(dataToSend, function (sendError, body) {
        if (sendError) {
            console.log(sendError);
            return;
        }
    });
});
