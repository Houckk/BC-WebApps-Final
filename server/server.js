import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import graphQLProxy, { ApiVersion } from "@shopify/koa-shopify-graphql-proxy";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import session from "koa-session";
import * as handlers from "./handlers/index";
import * as firebase from "firebase";
import "firebase/database";

dotenv.config();
const config = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: process.env.AUTH_DOMAIN_FIREBASE,
  databaseURL: process.env.DATABASE_URL_FIREBASE,
  //     projectId: process.env.PROJECT_ID_FIREBASE,
  projectId: "shopify-faq-app-official",
  storageBucket: process.env.STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.APP_ID_FIREBASE
};

firebase.initializeApp(config);
var db = firebase.firestore();

function createOrUpdateAccessToken(storeUrl, token) {
  var allStores = db.collection("stores");
  var selectedStore = allStores.where("url", "==", storeUrl);
  if (selectedStore === undefined) {
    var newStoreRef = db.collection("stores").doc(storeUrl);
    newStoreRef
      .set({
        accessToken: token,
        url: storeUrl
      })
      .then(function() {
        console.log("New document written with ID: ", storeUrl);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  } else {
    var docRef = db.collection("stores").doc(storeUrl);
    docRef
      .update({
        accessToken: token
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}

function GetAccessToken(shopUrl) {
  var docRef = db.collection("stores").doc(shopUrl);

  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        console.log("Doc Data Token", doc.data().accessToken);
        return doc.data().accessToken;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}

const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev
});
const handle = app.getRequestHandler();
const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY, SCOPES } = process.env;
app.prepare().then(() => {
  const server = new Koa();
  const Router = require("koa-router");
  const router = new Router();
  server.use(
    session(
      {
        sameSite: "none",
        secure: true
      },
      server
    )
  );
  server.keys = [SHOPIFY_API_SECRET];
  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET,
      scopes: [SCOPES],

      async afterAuth(ctx) {
        //Auth token and shop available in session
        //Redirect to shop upon auth
        const { shop, accessToken } = ctx.session;

        //TestFunction(shop,accessToken)
        console.log("Server Shop:", shop);
        console.log("Server Access Token:", accessToken);
        createOrUpdateAccessToken(shop, accessToken);

        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: "none"
        });
        ctx.redirect("/");
      }
    })
  );
  server.use(
    graphQLProxy({
      version: ApiVersion.October19
    })
  );

  router.get("/api/pages", async ctx => {
    try {
      console.log("Inside of Try");
      const storeAccessToken = async () => {
        const result = await GetAccessToken(shop);
        return result;
      };

      console.log("storeAccessToken", storeAccessToken);

      const results = await fetch(
        "https://bc-webapps-final.myshopify.com/admin/api/2020-04/pages.json",
        {
          headers: {
            "X-Shopify-Access-Token": storeAccessToken
          }
        }
      )
        .then(response => response.json())
        .then(json => {
          console.log(json);

          return json;
        });
      ctx.body = {
        status: "success",
        data: results
      };
    } catch (err) {
      console.log("Error in Api Call:", err);
    }
  });

  // router.get("*", verifyRequest(), async ctx => {
  //   await handle(ctx.req, ctx.res);
  //   ctx.respond = false;
  //   ctx.res.statusCode = 200;
  // });

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
