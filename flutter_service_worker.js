'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "11e913d141a389a5c66c50d935a9da5a",
"assets/assets/1todosDispositivos.JPG": "4fce8704c3ce1cc726ff2343e63a2166",
"assets/assets/2todosDispositivos.JPG": "11e39fa0950516c9afd405c98fec9345",
"assets/assets/about_logo.png": "363dec2947a6f393443dfd163ab182f5",
"assets/assets/calificar_check.png": "ece3dd43eee28cf6c9b1331235f0fbfd",
"assets/assets/calificar_check_big.png": "d4d03cd130ce8b47e7e858a7801ff558",
"assets/assets/celapp.jpeg": "7ecfd60c783bdc53c6299c7d1056363f",
"assets/assets/circulos.gif": "a2debfb85547f48c3a699423ba75f321",
"assets/assets/City.flr": "df25ad68bf59dd7d4ab97427b7641c4a",
"assets/assets/credenciales.jpg": "6c327c7bff853dacb5925a57472d267b",
"assets/assets/drcurita.png": "fbee895ee0bd4dd05c378e272da02cc0",
"assets/assets/etiquetas.PNG": "58dbd20ea2d23e92e6ee60980790e867",
"assets/assets/flores.flr": "1a1a12a1a153e3a459b710423a72a53e",
"assets/assets/fondo.jpg": "d20e13679e5ba7a25e34616e61fa0559",
"assets/assets/login.png": "35a57a8b755b1c68d9c248c975c86315",
"assets/assets/logo_medina.png": "4091c1a9f8722165a9c3b6b0bb312e99",
"assets/assets/medinatural.PNG": "a6ac230f494d76b8e0376e4831f44ac6",
"assets/assets/miperfil_user.png": "7e21fbb212c566b5e002bc3c5510cbf5",
"assets/assets/miscalificaciones_list.png": "7ff4fd4b4bae85fd1525400418a6d8ca",
"assets/assets/negro.jpeg": "1e13600ec32e8acece51a528a7a05542",
"assets/assets/paciencia.gif": "a6c7003d0adec3eb7134610ce7ee086c",
"assets/assets/perfilapp.png": "09332e588e70f0cbb23d026b95802fa7",
"assets/assets/perfiles_group.png": "8726028143e18d0161d531e617d2bcb9",
"assets/assets/rubro.jpg": "a40a6b5413e648b529524a71049f350e",
"assets/assets/soda.gif": "393980c67a99e349a1645105d623e611",
"assets/assets/Teddy.flr": "21ea0a00adb2b431a132689dc3903f4a",
"assets/assets/textura3.png": "dc685a6548bb7b22af60b1db45f314ad",
"assets/assets/textura4.png": "893b7f47f6cc9b67cdf9a2b51c9daa01",
"assets/assets/textura5.png": "34a1c31e09904836bab91a12c5ecfb0c",
"assets/assets/todosDispositivos.JPG": "7e21ae53f5cc99c9be7e9d79ed762652",
"assets/assets/viento.flr": "1a1a12a1a153e3a459b710423a72a53e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "00423ee1a7c2ebfa97642904dbaf744c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "8bdb80dfeeb6fad84311576a6987e4e4",
"/": "8bdb80dfeeb6fad84311576a6987e4e4",
"main.dart.js": "e5c55579733d2b2eda8ec43de4e6bf6b",
"manifest.json": "063173e5b623927aff7e7c8f0126cfee",
"version.json": "0019dbc1d16d6a7b1f2bc3b1ab461f73"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
