import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export default mongoose.connect('mongodb://localhost:27017/todosdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false})
  .then(
  () => {console.log("Database is connected")},
  err => {throw err}
);
