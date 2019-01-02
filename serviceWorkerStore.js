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
	console.log('fetch 拦截')
})