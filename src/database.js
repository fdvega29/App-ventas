const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://fdvega29:Fer_2911@cluster0.1b1q6.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

.then(db => console.log('Db is connected'))
.catch(err => console.error(err));