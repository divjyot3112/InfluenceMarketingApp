module.exports = {
    mongoURI: 'mongodb+srv://admin:admin@cluster0-xnxsx.mongodb.net/test?retryWrites=true&w=majority',
    mongoCFG: {
        useNewUrlParser: true,
        ssl: true,
        replicaSet: true,
        authSource: 'admin',
        retryWrites: true,
        useUnifiedTopology: true
    }
}