importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)

  // Pre-cache worker for the QR Scanner
  workbox.precaching.precacheAndRoute(['/lib/qr-scanner-worker.min.js'])

  // Cache all js & css
  workbox.routing.registerRoute(/\.(?:js|css)$/, new workbox.strategies.NetworkFirst())

  // Cache all images
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache'
    })
  )

  // Cache the main page
  workbox.routing.registerRoute(
    new RegExp(`${self.registration.scope}\[\\w\\W\\d]+/[\\w\\W\\d]+`),
    new workbox.strategies.NetworkFirst()
  )

  // Don't cache functions
  workbox.routing.registerRoute(
    new RegExp('https://europe-west1-scan-and-give.cloudfunctions.net/.*'),
    new workbox.strategies.NetworkOnly()
  )

  // Cache all
  workbox.routing.registerRoute(new RegExp(), new workbox.strategies.NetworkFirst())
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}
