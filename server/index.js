const app = require("./app");

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  console.log("Production Mode");
} else if (process.env.NODE_ENV == "development") {
  console.log("Development Mode");
}

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
