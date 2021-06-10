/**
 * MongoDB Setup & Configuration
 */
const mongoose = require('mongoose');

/**
 * Handle Deprecation Warnings
 * https://mongoosejs.com/docs/deprecations.html
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_STRING}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Connection Error: '));
db.once('open', function() {
    console.log('Database Connected Successfully.')
})