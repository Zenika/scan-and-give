<p align="center">
  <img src="https://raw.githubusercontent.com/Zenika/scan-and-give/master/logo.png">
</p>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0--alpha-blue.svg?cacheSeconds=2592000" />
</p>

> Scan your badge and make a donation

**✨ Check out the app: https://scan-and-give.web.app !**

---

## 🚀 How it works

**Scan-and-give** is a two-part application: The "admin" app and the "live" app.

### Admin application

In the admin application, you will be able to create and manage events and charities. Once your event is created, you will then be able to access the live app.

**Installation**

```
cd admin/
npm install
npm start
```

### Live application

The live application is the one that is presented to people at the events. It is used for them to choose a charity and scan their badge.

**Installation**

```
cd live/
npm install
npm start
```

---

## ⚙️ How it's made

Here is the stack:

- ReactJS for the frontend
- Bulma for the CSS (except live which is 100% homemade CSS)
- Firebase for the datastore, functions and authentication

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br/>
Feel free to check [issues page](https://github.com/Zenika/scan-and-give/issues) if you want to contribute.
