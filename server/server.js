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
//import React, { useState } from "react";

var bodyParser = require("koa-bodyparser"); //import {GetShopUrl} from "./../pages/Page-Templates/GraphQLTest"

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
const auth = firebase.auth();

//const [shopifyToken, setShopifyToken] = useState("");

var shopifyToken = "";

// function changeToken(token){
//   setShopifyToken(token)
// }

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
      .then(function() {})
      .catch(function(error) {});
  } else {
    var docRef = db.collection("stores").doc(storeUrl);
    docRef
      .update({
        accessToken: token
      })
      .then(function() {})
      .catch(function(error) {
        // The document probably doesn't exist.
      });
  }
}

async function GetAccessToken(shopUrl) {
  var docRef = await db
    .collection("stores")
    .doc(shopUrl)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        return doc.data().accessToken; //return 'ttesting'
      } else {
        // doc.data() will be undefined in this case
      }
    })
    .catch(function(error) {});
  return docRef;
}

function createOrUpdateThemeID(storeUrl, themeID) {
  var allStores = db.collection("stores");
  var selectedStore = allStores.where("url", "==", storeUrl);

  if (selectedStore === undefined) {
    var newStoreRef = db.collection("stores").doc(storeUrl);
    newStoreRef
      .set({
        themeID: themeID
      })
      .then(function() {})
      .catch(function(error) {});
  } else {
    var docRef = db.collection("stores").doc(storeUrl);
    docRef
      .update({
        themeID: themeID
      })
      .then(function() {})
      .catch(function(error) {
        // The document probably doesn't exist.
      });
  }
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
        const { shop, accessToken } = ctx.session; //TestFunction(shop,accessToken)

        //changeToken(accessToken);
        shopifyToken = accessToken;
        createOrUpdateAccessToken(shop, accessToken);
        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: "none"
        });
        server.context.client = await handlers.createClient(shop, accessToken);

        await handlers.getSubscriptionUrl(ctx);
      }
    })
  );
  server.use(
    graphQLProxy({
      version: ApiVersion.October19
    })
  );
  server.use(bodyParser());
  router.post("/api/pages", async ctx => {
    try {
      //const storeUrl = await GetShopUrl()

      const storeUrl = "bc-webapps-final.myshopify.com";

      const shopOrigin = await GetAccessToken("bc-webapps-final.myshopify.com");
      var myHeaders = new Headers();
      myHeaders.append("X-Shopify-Access-Token", shopOrigin);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(ctx.request.body);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      fetch(
        "https://bc-webapps-final.myshopify.com/admin/api/2020-04/pages.json",
        requestOptions
      ).then(response => response.text());
    } catch (err) {}
  }); //Template routes

  router.get("/liquid/all_themes", async ctx => {
    try {
      const storeUrl = "bc-webapps-final.myshopify.com";
      const shopOrigin = await GetAccessToken("bc-webapps-final.myshopify.com");
      const results = await fetch(
        "https://bc-webapps-final.myshopify.com/admin/api/2020-04/themes.json",
        {
          headers: {
            "X-Shopify-Access-Token": shopOrigin
          }
        }
      )
        .then(response => response.json())
        .then(json => {
          var i;
          var currentThemeID = [];

          for (i = 0; i < json.themes.length; i++) {
            if (json.themes[i].role === "main") {
              currentThemeID.push(json.themes[i].id);
            }
          }

          createOrUpdateThemeID(
            "bc-webapps-final.myshopify.com",
            currentThemeID
          );
          return json;
        });
      ctx.body = {
        status: "success",
        data: results
      };
    } catch (err) {}
  });
  router.put("/liquid/new_template", async ctx => {
    try {
      //const storeUrl = await GetShopUrl()

      const storeUrl = "bc-webapps-final.myshopify.com";
      const shopOrigin = await GetAccessToken("bc-webapps-final.myshopify.com");
      var myHeaders = new Headers();
      myHeaders.append("X-Shopify-Access-Token", shopOrigin);
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(ctx.request.body);
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      fetch(
        "https://bc-webapps-final.myshopify.com/admin/api/2020-04/themes/94604886061/assets.json",
        requestOptions
      ).then(response => response.text());
    } catch (err) {}
  });
  router.put("/api/signup", async ctx => {
    var email = ctx.request.body.email;
    var password = ctx.request.body.password;
    const user = {
      email
    };
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        //db.collection("users").add(user);
        await db
          .collection("users")
          .doc(email)
          .set({
            email: email,
            accessToken: shopifyToken,
            tags: []
          });
        ctx.body = { error: false };
      })
      .catch(err => (ctx.body = { error: true }));
    //server.context.client = await handlers.createClient(shop, accessToken);
    //await handlers.getSubscriptionUrl(ctx);
  });
  router.put("/api/updateTags", async ctx => {
    const tags = ctx.request.body.tags;
    const email = ctx.request.body.user;

    //await db.collection("users").doc(user).update(tags);
    await db
      .collection("users")
      .doc(email)
      .update({
        accessToken: shopifyToken,
        tags: tags
      });
    ctx.body = "success";
  });
  router.put("/api/getTags", async ctx => {
    const user = ctx.request.body.email;
    var data;
    await db
      .collection("users")
      .doc(user)
      .get()
      .then(snapshot => {
        ctx.body = snapshot.data();
      });
  });
  router.put("/api/login", async ctx => {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async response => {
        await db
          .collection("users")
          .where("email", "==", response.user.email)
          .get()
          .then(snapshot => {
            ctx.body = {
              status: "success",
              user: snapshot.docs[0].data().email
            };
          });
      })
      .catch(error => {
        ctx.body = {
          status: "failure",
          user: "2nd"
        };
      });
  });
  router.put("/api/resetPassword", async ctx => {
    await auth.sendPasswordResetEmail(ctx.request.body.email);
  });
  router.get("*", verifyRequest(), async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });
  server.use(router.routes());
  server.use(router.allowedMethods());
  server.listen(port, () => {});
});
