module.exports = {
    mongoURI: 'mongodb+srv://root:root123@cluster0-bcaiq.mongodb.net/test?retryWrites=true&w=majority',
    mongoCFG: {
        useNewUrlParser: true,
        ssl: true,
        replicaSet: true,
        authSource: 'admin',
        retryWrites: true,
        useUnifiedTopology: true
    }
}