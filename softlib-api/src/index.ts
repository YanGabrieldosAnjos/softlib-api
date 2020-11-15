import "reflect-metadata";
import { BookController } from "./controllers/book";
import { UserController } from "./controllers/user";
import { BookRentController } from "./controllers/bookRent";

// import express from "express";
// import * as bodyParser from "body-parser";
// import cors from "cors";


// import routes from "./routes";
// const { PORT, NODE_ENV } = process.env;
// export const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.use("/api", routes);

// app.listen(PORT, function () {
//   console.log(
//     `Example app listening on port ${PORT}! Go to http://localhost:${PORT}/`
//   );
// });
const main = async ()=>{
  try{ 
      console.log("here")
      const u = new UserController();
      const b =  new BookController();
      const br = new BookRentController();
      const logged = await u.login("jjjj", "bbbb");
      
      console.log(await u.listRentedBooks("jjjj"));
  }catch(error){
      throw error;
  }
}

main();
// export default app;
