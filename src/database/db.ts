import mongoose from "mongoose";

/***
 * 0 = disconected
 * 1 = connected
 * 2 = connecting
 * 3 = disconected
 */

const mongoConection = {
    isConnected: 0
}

export const connect = async() => {
    if(mongoConection.isConnected === 1){
        console.log("Ya estabamos conectados");
        return;
    }

    if (mongoose.connections.length >= 0){
        mongoConection.isConnected = mongoose.connections[0].readyState;

        if(mongoConection.isConnected === 1) {
            console.log('Usando conexión anterior');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGODB_URL || '');
    mongoConection.isConnected = 2;
    console.log('Conectado a MongoDB!🚀', process.env.MONGODB_URL)
}

export const disconnect = async () => {

    if(process.env.NODE_ENV === 'development') return;

    if(mongoConection.isConnected === 0) return;

    await mongoose.disconnect();
    mongoConection.isConnected = 0;

    console.log("Desconectado de MongoDB 🔌")
}