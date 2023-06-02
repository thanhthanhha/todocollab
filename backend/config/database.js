const { default: mongoose } = require("mongoose")

const {MONGOOSE_URI} = process.env;

exports.connect = async () => {
    mongoose
        .connect(MONGOOSE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async () => {
            console.log("Connected to DB")
        })
        .catch((error) => {
            console.log(`database connection fail, please check service and config file ${MONGOOSE_URI}`);
            console.error(error);
            process.exit(1);
        })
}