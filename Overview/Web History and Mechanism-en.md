* The user enters a URL in the browser address bar
* The browser takes the domain name from the URL and requests the IP address of the server from a [DNS](https://en.wikipedia.org/wiki/Domain_Name_System).
* The browser creates an HTTP packet saying that it requests a web page located on the remote server.
* The packet is sent to the TCP layer which adds its own information on top of the HTTP packet. This information is required to maintain the started session.
* The packet is then handed to the IP layer which main job is to figure out a way to send the packet from you to the remote server. This information is also stored on top of the packet.
* The packet is sent to the remote server.
* Once the packet is received, the response gets sent back in a similar manner.
