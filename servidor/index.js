const express = require('express');
const cors = require('cors');
const app = express();

const notificaciones = [
    { id: 1, cuerpo: "tienes una nueva actividad" },
    { id: 2, cuerpo: "tienes una nueva actividad" }
];

let responsesClientes = [];

app.use(cors());
app.use(express.json());

app.get('/notificaciones', (req, res) => {

    res.status(200).json({
        notificaciones
    });
})

app.get('/nueva-notificacion', (req, res) => {
    
    responsesClientes.push(res);
});

function responderClientes(notificacion) {
    for (res of responsesClientes) {

        res.status(200).json({
            success: true,
            notificacion
        });
    }

    responsesClientes = [];
}

app.post('/notificaciones', (req, res) => {
    const idNotificacion = notificaciones.length > 0 ? notificaciones[notificaciones.length - 1].id + 1 : 1;

    const notificacion = {
        id: idNotificacion,
        cuerpo: req.body.cuerpo
    };
    notificaciones.push(notificacion);

    // responder a los clientes
    responderClientes(notificacion)

    return res.status(201).json({
        success: true,
        message: "notificación guardada"
    });
});

app.listen(3000, () => console.log("servidor corriendo en el puerto 3000"))