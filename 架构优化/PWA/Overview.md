[![返回目录](https://parg.co/US3)](https://parg.co/UGZ)

# Progressive Web Apps Overview

Progressive Web Apps (PWA) are the latest trend in mobile application development using web technologies. At the time of writing (early 2018), they’re only applicable to Android devices.

Accelerated Mobile Pages Project (AMP) spearheaded by Twitter and Google was launched in 2016 to solve those slow connection issues only. PWAs work flawlessly in all the possible scenarios. With a good connection, there is never a problem. The problem is when we have no connection and we are greeted with the error page.

But this can become most annoying if we have a slow connection. The page seems to be loading and all we see is a blank screen. We just wait, wait and wait but the page never seems to load. This is where PWA comes to our rescue. The best part about PWAs — you get the best user experience possible in slow connectivity as well as no connectivity (yep , you read it right..).

Native App features that PWAs can use
Push notifications
Full Screen
Offline working
Splash screen is supported giving it a more app like feel
PWAs can make use of many more such features. The above points are only to give you a hint of what PWAs are capable of. However, there are some traditional features that only native apps enjoy as of now.

Native App features that PWAs can’t use as of now
No or highly restrictive access to different hardware sensors
Alarms
Phonebook Access
Modfiying System Settings
PWAs are evolving quite fast and we can ho

Two Major Components of a PWA
App Manifest
It’s a JSON file that defines an app icon, how to launch the app (standalone, full-screen, in the browser etc), and any such related information. It’s located in the root of your app. A link to this file is required on each page that has to be rendered.
It is added in the head section of the HTML page:

<link rel=”manifest" href="/manifest.json">
Service Worker
Service worker is where most of the magic of happens. Its nothing but JavaScript code that acts as programmable proxies solely responsible for intercepting and responding to network requests. Since it acts as a proxy and can be easily programmable, the application must be served over HTTPS to keep the data secure.
Its worth noting that the service worker caches the actual response, including all HTTP headers, rather than just the response data. This means that your application can simply make network requests and process the response without any specific code to handle the cache.
