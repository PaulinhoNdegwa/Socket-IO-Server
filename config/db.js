import { DB_URL } from './variables';
import mongoose from 'mongoose';


mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        // userUnifiedTypography: true
    })
    .then(() => console.log("DB is running"))
    .catch(error => console.log(`DB Error: + ${error}`))