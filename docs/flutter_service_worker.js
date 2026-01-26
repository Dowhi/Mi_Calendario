'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"alarm-notification.html": "5ffba70881b541ad79291564ff3141d7",
"assets/AssetManifest.bin": "da8347a7089808ba77a97fce761b43cf",
"assets/AssetManifest.bin.json": "a242cb88d9882dededb36cedc4e13de4",
"assets/AssetManifest.json": "f9d8af38f54aacef01125d3fca475f05",
"assets/assets/icon/app_icon.png": "8bcdf0ab3bc4dedd1b0c5d8f23e3b944",
"assets/assets/videos/README.md": "8b99c64134918a623ab0ca2ef390939a",
"assets/assets/videos/splash_video.mp4": "ef66b662d3701f18755cbc7ebd322ed2",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "56018a2c730a9a8a1ff62ccf3dc66b81",
"assets/NOTICES": "dd98fd7d70d4b6f7446f5c859d0ce3cf",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/wakelock_plus/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"calendar.html": "7d9f4d324f63c28f10c2394ae424ee6c",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b",
"export-calendar.html": "e2747bb593eafb9b303abf20a1a47270",
"favicon.png": "a8c3e5444ad6579a4bc5dfb9fb6bc14a",
"firestore_backup.html": "41582f7631d6d31d1e58578f189ff697",
"firestore_cleanup.html": "c5edb961f1afc9418b12d3ec4f3ac6c1",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "c045772a520b852c80e3103be48a1b79",
"flutter_bootstrap_simple.js": "50b2b30283f2c956cedd294ec7304a59",
"global-style.css": "836bcdc636d2941655d1e876703d15ae",
"icons/Icon-192.png": "f91107f59c7b6175a568da7372f5173c",
"icons/Icon-512.png": "279c35343aca424086b33d02ef4ebe47",
"icons/Icon-maskable-192.png": "f91107f59c7b6175a568da7372f5173c",
"icons/Icon-maskable-512.png": "279c35343aca424086b33d02ef4ebe47",
"index-ios-simple.html": "8f924a428909bce461ed69bb7a15afbd",
"index-ios.html": "8337bbfa3dc57f3fcb106613abbf7dea",
"index.html": "dfd3dab09d282c2d2e9863af13142d20",
"/": "dfd3dab09d282c2d2e9863af13142d20",
"index_simple.html": "24d7780d64ba6cfe07cef27208962a6c",
"ios-debug-simple.js": "e60e1150d07fc30c69176a3aef561dea",
"iphone.html": "d76f406c8b88d9f76ddc6169829dc1d0",
"main.dart.js": "2b51ffaf51d0e5c535a1d639eaf3e0ec",
"manifest.json": "1224af45d15b3ec32cfdc8f956cd4166",
"migrate_categories.html": "7ff24663d9dec13e8bfe72c7647ed5f8",
"recurring-events.html": "3b77a774e39cba5e9512061f64ef643e",
"reminders.html": "bdc393a26e32136d2924d47a9da38c55",
"shift-config.html": "04dc3b482e5a4e856c1cc5288c365b5e",
"shifts.html": "921fbf9c163cfe197c104b4ed44dfdbb",
"summary.html": "be31db41c5f5bb174750e37c25a9c522",
"sw-alarm.js": "09ac5a5102d2cdf315a9d8daab856425",
"sw.js": "bf5d1b322f10ea4bd46c1dc97153256a",
"users-management.html": "97cd945f40935ded5064fa409d9b4241",
"version.json": "da02de1699ca37293002448d9268a30a",
"week-view.html": "06e81e1070a179502d7ec91d4bcc34cf"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
