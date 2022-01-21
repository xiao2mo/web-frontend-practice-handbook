[![返回目录](https://parg.co/US3)](https://parg.co/UGZ)

# ServiceWorker

A web worker is a JavaScript script executed from an HTML page that runs in the background, independently of other user-interface scripts that may also have been executed from the same HTML page.Mimics multithreading, allowing intensive scripts to be run in the background so they do not block other scripts from running. Ideal for keeping your UI responsive while also performing processor-intensive functions. Cannot directly interact with the DOM. Communication must go through the Web Worker’s postMessage method.

Service Workers are a new browser feature that provide event-driven scripts that run independently of web pages. Unlike other workers Service Workers can be shut down at the end of events, note the lack of retained references from documents, and they have access to domain-wide events such as network fetches.

ServiceWorkers also have scriptable caches. Along with the ability to respond to network requests from certain web pages via script, this provides a way for applications to "go offline".

Service Workers are meant to replace the (oft maligned) HTML5 Application Cache. Unlike AppCache, Service Workers are comprised of scriptable primitives that make it possible for application developers to build URL-friendly, always-available applications in a sane and layered way.

A service worker is a programmable proxy between your web page and the network which provides the ability to intercept and cache network requests. This effectively lets you create an offline-first experience for your app.

While Service Workers cannot directly interact with the DOM, your main JS code can do that based on the messages you receive back from a Service Worker. Service workers also stop when not being used and restart when needed, so there is no persistent “state”; you would need to rely on some form of local storage for such persistence. It is important to remember that a Service Worker’s life cycle is completely separate from your webpage.

# 离线存储

![](https://cdn-images-1.medium.com/max/1600/1*dfohRhGZpHXNzZQdJvaRDQ.png)
