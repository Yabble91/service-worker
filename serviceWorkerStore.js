var CACHEVERSION = "test1";
var urlsToCache = [
	'./main.js',
	'./main.css',
	'./main.jpg'
];

self.addEventListener('install', function (event) {
	console.log('install sw')
	event.waitUntil(
		caches.open(CACHEVERSION).then(function (cache) {
			return cache.addAll(urlsToCache)
		})
	)
})
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
    	console.log(cacheNames)
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== CACHEVERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
})
self.addEventListener('fetch', function (event) {
	event.respondWith(caches.match(event.request).catch(function() {
		console.log('发送fetch请求')
    return fetch(event.request);
  }).then(function(response) {
		console.log('打开缓存服务员')
    caches.open(CACHEVERSION).then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
		console.log('还得用')
    return caches.match('./main.jpg');
  }));
})
