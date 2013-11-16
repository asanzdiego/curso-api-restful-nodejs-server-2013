// modulos requeridos
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// definimos el modelo 'talk' con sus restricciones
// también podemos definir relaciones con otros modelos
// aquí no se ha hecho por simplificar
var talkSchema = new Schema({
    talkName:           { type: String, required: true },
    talkDate:           { type: Date,   required: true },
    talkSpeaker:        { type: String, required: true },
    talkSpeakerMail:    { type: String, required: true, match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ },
    talkPoints:         { type: Number, required: true, default:0 }
});

// exportamos el modelo
module.exports = mongoose.model('Talk', talkSchema);
