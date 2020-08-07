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

async function GetAccessToken(shopUrl) {
  console.log("GetAccessToken is Called: ", shopUrl);
  var docRef = await db
    .collection("stores")
    .doc(shopUrl)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("YAYYYY Document Exists!!!");
        console.log("Document data:", doc.data());
        console.log("Doc Data Token", doc.data().accessToken);
        return doc.data().accessToken; //return 'ttesting'
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
  console.log("DocRef Value", docRef);
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
        themeID: themeID
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

        console.log("ServerShop:", shop);
        console.log("Server Access Token:", accessToken);
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
      console.log("Inside of Try"); //uncomment the top line to see the error, the bottom one to test the code
      //const storeUrl = await GetShopUrl()

      const storeUrl = "bc-webapps-final.myshopify.com";
      console.log("Store's Url: ", storeUrl); //console.log(ctx);
      //console.log(req.body);

      const shopOrigin = await GetAccessToken("bc-webapps-final.myshopify.com");
      var myHeaders = new Headers();
      myHeaders.append("X-Shopify-Access-Token", shopOrigin);
      myHeaders.append("Content-Type", "application/json"); //console.log(ctx.request.body)

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
      )
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));
    } catch (err) {
      console.log("Error in Api Call:", err);
    }
  }); //Template routes

  router.get("/liquid/all_themes", async ctx => {
    try {
      console.log("Inside of Try");
      const storeUrl = "bc-webapps-final.myshopify.com";
      console.log("Store's Url: ", storeUrl);
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
          console.log("Parsed Get Response", json);
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
    } catch (err) {
      console.log("Error in Api Call:", err);
    }
  });
  router.put("/liquid/new_template", async ctx => {
    try {
      console.log("Inside of Try Put of New Template"); //uncomment the top line to see the error, the bottom one to test the code
      //const storeUrl = await GetShopUrl()

      const storeUrl = "bc-webapps-final.myshopify.com";
      console.log("Store's Url: ", storeUrl);
      const shopOrigin = await GetAccessToken("bc-webapps-final.myshopify.com");
      var myHeaders = new Headers();
      myHeaders.append("X-Shopify-Access-Token", shopOrigin);
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(ctx.request.body);
      console.log("Raw", raw);
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      fetch(
        "https://bc-webapps-final.myshopify.com/admin/api/2020-04/themes/94604886061/assets.json",
        requestOptions
      )
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));
    } catch (err) {
      console.log("Error in Api Call:", err);
    }
  });
  router.put("/api/signup", async ctx => {
    console.log(ctx.request.body.email);
    var email = ctx.request.body.email;
    var password = ctx.request.body.password;
    const user = {
      email
    };
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      db.collection("users").add(user);
    });
    server.context.client = await handlers.createClient(shop, accessToken);
    await handlers.getSubscriptionUrl(ctx);
    ctx.body = "success";
  });
  router.put("/api/updateTags", async ctx => {
    const tags = ctx.request.body.tags;
    const user = ctx.request.body.user;
    console.log(tags);
    console.log("user: " + user);
    await db
      .collection("users")
      .doc(user)
      .set(tags);
    ctx.body = "success";
  });
  router.put("/api/getTags", async ctx => {
    const user = ctx.request.body.email;
    console.log("user: " + user);
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
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
