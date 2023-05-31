//estabelecimento da conexão do MongoDB usando a biblioteca mongoose
import mongoose from "mongoose";

//para controlar a quantidade de tentativas de conexão com o banco de dados
let count = 0;

//realiza a tentativa de conexão com o banco de dados MongoDB.
function connectWithRetry() {
    mongoose.connect('mongodb+srv://gabrielpcaravantes:NVgcjMIWiZcVvkbj@cluster0.dnkyxjk.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
            console.log("Conectado ao MongoDB com sucesso");
        })
        .catch((err) => {
            console.log(
                "Não foi possível conectar ao MongoDB"
            );
            console.log(`Error: ${err}`);
            count++;

            setTimeout(connectWithRetry, 5000);
        });
}


connectWithRetry();

export default mongoose;
