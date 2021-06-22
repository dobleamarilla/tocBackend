import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/tocgame', { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
    console.log(err);
});
// mongoose.set('useFindAndModify', false);
export {mongoose};