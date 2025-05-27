import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//todo añadir cors a la documentación

// Import routes
// User routes
import {userRouteDelete} from "./src/users/routes/userRouteDelete.js";
import {userRouteGet} from "./src/users/routes/userRouteGet.js";
import {userRoutePost} from "./src/users/routes/userRoutePost.js";
import {userRoutePut} from "./src/users/routes/userRoutePut.js";

// Links routes
import {linkRouteDelete} from "./src/links/routes/linksRouteDelete.js";
import {linksRouteGet} from "./src/links/routes/linksRouteGet.js";
import {linksRoutePost} from "./src/links/routes/linksRoutePost.js";
import {linksRoutePut} from "./src/links/routes/linksRoutePut.js";

// Links visited routes
import {linkVisitedRoutePost} from "./src/linksVisited/routes/linkVisitedRoutePost.js";
import {linksVisitedRouteGet} from "./src/linksVisited/routes/linksVisitedRouteGet.js";
import {linksVisitedRoutePost} from "./src/linksVisited/routes/linksVisitedRouteDelete.js";

// Auth routes
import {loginRouter} from "./src/auh/routes/authRouteLogin.js";

dotenv.config();

/**
 * The `app` variable represents an instance of an Express application.
 * It is used to define middleware, route handlers, and configuration settings
 * for a web server or API. The `app` object provides methods for HTTP actions
 * such as GET, POST, PUT, DELETE, and more, enabling the handling of requests
 * and responses.
 */
const app = express();

app.use(cors());

/**
 * Middleware to parse JSON bodies in incoming requests.
 */
app.use(express.json());

/**
 * @description Authentication routes.
 */
app.use(
    loginRouter
);

/**
 * @description Routes related to user operations.
 */
app.use(
    userRouteDelete,
    userRouteGet,
    userRoutePost,
    userRoutePut
);

/**
 * @description Routes related to link operations.
 */
app.use(
    linkRouteDelete,
    linksRouteGet,
    linksRoutePost,
    linksRoutePut
);

/**
 * @description Routes related to visited links.
 */
app.use(
    linkVisitedRoutePost,
    linksVisitedRouteGet,
    linksVisitedRoutePost
);

/**
 * Starts the server on the port specified in the .env file.
 */
app.listen(process.env.APP_PORT, () => {
    console.log('Server is running on port ' + process.env.APP_PORT);
});
