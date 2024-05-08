import chalk from "chalk";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import _ from "lodash";
import axios from "axios";

const app = express();
const PORT = 3000;
const usuarios = [];



// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.get('/registrar', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api');
        const userData = response.data.results[0];
        const userId = uuidv4();
        const registrationTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const newUser = {
            id: userId,
            nombre: userData.name.first,
            apellido: userData.name.last,
            sexo: userData.gender,
            horaRegistro: registrationTime
    };
    usuarios.push(newUser);
    res.json(newUser);  
     
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error al registrar el usuario');
    }
    
});

app.get('/usuarios', (req, res) => {
    try {
        const usuariosPorSexo = _.groupBy(usuarios, 'sexo');
        console.log(chalk.bgWhite.blue('Los usuarios por sexo son:'), usuariosPorSexo);
        res.status(200).json({usuariosPorSexo});
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error al obtener los usuarios');
    }
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});