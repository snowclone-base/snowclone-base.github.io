var suggestions = document.getElementById("suggestions"),
  search = document.getElementById("search");
search !== null && document.addEventListener("keydown", inputFocus);
function inputFocus(e) {
  e.ctrlKey && e.key === "/" && (e.preventDefault(), search.focus()),
    e.key === "Escape" && (search.blur(), suggestions.classList.add("d-none"));
}
document.addEventListener("click", function (e) {
  var t = suggestions.contains(e.target);
  t || suggestions.classList.add("d-none");
}),
  document.addEventListener("keydown", suggestionFocus);
function suggestionFocus(e) {
  const s = suggestions.classList.contains("d-none");
  if (s) return;
  const t = [...suggestions.querySelectorAll("a")];
  if (t.length === 0) return;
  const n = t.indexOf(document.activeElement);
  if (e.key === "ArrowUp") {
    e.preventDefault();
    const s = n > 0 ? n - 1 : 0;
    t[s].focus();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    const s = n + 1 < t.length ? n + 1 : n;
    t[s].focus();
  }
}
(function () {
  var e = new FlexSearch.Document({
    tokenize: "forward",
    cache: 100,
    document: {
      id: "id",
      store: ["href", "title", "description"],
      index: ["title", "description", "content"],
    },
  });
  e.add({
    id: 0,
    href: "/docs/case-study/introduction/",
    title: "Introduction",
    description: `Otter is a drop-in, cloud native framework for peer-to-peer video communication within web applications. It can be deployed to AWS with a single command and is ideal for web applications with real-time video communication needs.
For an application developer, Otter abstracts away the complexity of establishing a resilient, scalable infrastructure, and provides a simple way to integrate peer-to-peer WebRTC video calling into an application where privacy is of utmost importance.`,
    content: `Otter is a drop-in, cloud native framework for peer-to-peer video communication within web applications. It can be deployed to AWS with a single command and is ideal for web applications with real-time video communication needs.
For an application developer, Otter abstracts away the complexity of establishing a resilient, scalable infrastructure, and provides a simple way to integrate peer-to-peer WebRTC video calling into an application where privacy is of utmost importance.
In this case study, we will dive into Otter and explore how we built it and the design decisions and technical challenges we faced along the way. We will begin with an overview of peer-to-peer (P2P) and WebRTC.
Why Video Calling? #
Video calling; it’s hard to imagine our modern world without it, and thus it’s no surprise that software developers are increasingly interested in incorporating it into their applications. In the last few years especially, the growth of telehealth has made video calling more commonplace in healthcare, though this is just one of many industries embracing video communication.
However, implementing reliable and scalable video communication comes with nuanced considerations, and developers need to consider several approaches to ensure that their solution is optimized for their end users. For example, selecting a network topology (how the various nodes of a network are arranged and connected) can have implications regarding the latency, resilience, and even privacy of a network. Within this case study, we will discuss many of the tradeoffs a developer may need to consider, starting with the tradeoffs between two major network topologies: a peer-to-peer model versus a client-server model.
P2P vs Client-Server Network Topologies #
P2P is a network topology in which devices communicate directly with each other without the need for a central server. In a P2P network, each device can act as both a client and a server, meaning that it can both send and receive data directly from other devices in the network.
By contrast, in a client-server network topology, devices connect to a centralized server, which manages communication between them.
Benefits of P2P for Video Calling #
Increased privacy for peers: P2P networks eliminate the need for a central server that can log or monitor data passing through.
Decreased latency between peers: Without a central server, data has one less hop on the network before being sent to its destination, which can reduce the distance and time required to transmit information.
Increased network resilience: A central server represents a single point of failure; if it goes down then peers cannot communicate. A P2P network distributes the burden of transporting data across all peers in the network, rather than relying on dedicated servers.
Cost-effective: A developer does not have to pay to provision and maintain dedicated servers or the bandwidth they would consume (since bandwidth consumed between peers is each peer’s individual responsibility).
P2P networks have their limitations, and in the context of a video call, the most notable limitation is call size. Let’s see what happens when more peers are added to the network.
In its simplest form, a P2P network requires that each peer connects to every other peer in the network1. Thus, in a P2P video call with 20 peers, each peer must send its video data in 19 different directions, and must process 19 separate incoming video streams from other peers! Larger call sizes quickly become untenable in terms of the bandwidth requirement placed on individual peers; a P2P video call may be able to support around 6 participants before performance is degraded.
Benefits of Client-Server for Video Calling #
Greater call size: Connections between peers are handled by a central server, which is within a developer\u0026rsquo;s control. This means the developer can scale the hardware of the server, or potentially scale to multiple servers to handle increased call sizes.
Real time processing: For example, the ability to record a call, apply closed captions, facial recognition, even use an AI note taker.
A client-server model would be a more effective choice for a developer who needs to support call sizes of more than a few people or needs additional features like the ability to record calls. This topology could make sense for a developer who wants to implement video conferencing for online classes, support large business meetings, or record video calls that can be reviewed later for training purposes.
However, for a developer working on an application where privacy is of the utmost importance, a P2P topology is a better fit. Telehealth calls and virtual legal consultations are situations where calls will often contain sensitive information, and the privacy of these calls may be protected by law. Thus, the privacy gained by removing a central server (which can process and monitor these communications) is notable. Additionally, the private nature of these calls means that call sizes will seldom be larger than a few people.
Transport Protocols in Context of Video Calling #
For the developer who wants to add P2P video calling to their web application, what else should be considered that may affect the user experience? Latency is a key aspect that can make video calls feel responsive, and various methods of transporting media packets over the network can affect latency. Typically, media packets are transported through TCP (Transmission Control Protocol) or UDP (User Datagram Protocol).
TCP is a protocol designed to make data transmission across the network reliable. TCP is considered a connection-oriented protocol because every TCP connection has three well-defined phases, including a handshake which establishes the parameters for data transmission to come. Once the handshake is completed, packets can be sequenced and delivered in order, and if a packet is lost, it is retransmitted, thus providing a guarantee of delivery and a guarantee of in-order delivery. TCP also has built-in control for network congestion avoidance by delaying packets if network congestion is detected. Both such guarantees and network congestion avoidance can increase the latency in the transmission of real-time video.
On the other hand, UDP is a connectionless protocol, and can send data without having to first establish a connection. UDP does not offer reliability. It instead offers speed and flexibility. A few lost packets can be tolerated as long as the video stream remains uninterrupted, because having the latest data is more important than having all the data.
UDP is therefore ideal for rich audio and video data transmission, while TCP’s reliability mechanisms can introduce delays that are not conducive to a responsive audio-video user experience.
UDP-based, P2P Video Calling Solutions #
Now that we have established the need for a UDP-based, P2P video calling solution, what are some of the questions that will arise during the development of the video calling application?
How to enable reliable communication channels over UDP? How to process audio and video media streams? How to encrypt application data end-to-end? How to bypass restrictive network environments? Many protocols offer different solutions to the above challenges. We will explore some of them in depth.
It is possible for developers to build P2P video calling functionality by manually stitching together multiple protocols, like RTMFP (Real Time Media Flow Protocol) with SIP (Session Initiation Protocol). This could provide a high degree of customization, but at the expense of valuable time, as a developer would have to gain a deep understanding of multiple protocols and how they should interact together.
Fortunately, there is already a solution that orchestrates protocols to implement UDP-based, P2P real-time communication: WebRTC. WebRTC is a communication standard, is free, and works natively within browsers. It has been endorsed by W3C, an organization focused solely on the development of standards for the web. W3C has recommended “\u0026hellip; the wide deployment of this specification [WebRTC] as a standard for the Web”. WebRTC has been widely adopted in many products and services, including Google Meet, Facebook Messenger, and Discord.
WebRTC orchestrates well established protocols to abstract away much of the complexity associated with implementing a video calling application. This makes WebRTC a strong candidate for a developer looking to integrate a UDP-based, P2P video calling solution into a web application.
While implementing real-time P2P functionality will be much more straightforward with WebRTC than without, there is still a depth of knowledge required for working with it. We will touch on this essential knowledge next.
Notes #
There are additional P2P topologies, but these are beyond the scope of this case study\u0026#160;\u0026#x21a9;\u0026#xfe0e;
`,
  }),
    e.add({
      id: 1,
      href: "/docs/case-study/web-rtc/",
      title: "How WebRTC Works",
      description: `How do Peers Connect? #
Let’s look at a high-level workflow of how a direct connection can be established between two peers. We will use an analogy of a peer Alice sending physical mail to another peer Bob.
How does Alice know where to address her mail to?
Alice will need some mechanism to exchange addresses with Bob to facilitate the delivery, which is known as signaling. This could be a text message or even a pigeon carrier.`,

      content: `How do Peers Connect? #
Let’s look at a high-level workflow of how a direct connection can be established between two peers. We will use an analogy of a peer Alice sending physical mail to another peer Bob.
How does Alice know where to address her mail to?
Alice will need some mechanism to exchange addresses with Bob to facilitate the delivery, which is known as signaling. This could be a text message or even a pigeon carrier. In practice, this is typically facilitated by a server.
Let’s suppose Alice and Bob are in the same building. All communication passes via the signaling mechanism. Alice informs Bob that she is interested in sending him mail but she needs his room number. Bob responds with this information and Alice is then able to deliver the mail directly.
While this is ideal, what happens if Alice is actually in a different building than Bob?
Alice and Bob may know each other’s room number, but this information is rather useless outside of their respective buildings unless they also know their buildings’ addresses. To find their respective building addresses, they can each ask their building doorman.
Now with a building address and room number, they can communicate this information using the same signaling mechanism. Alice can visit Bob’s building and deliver the mail herself directly.
What if Alice is traveling and ends up in a different city, state or country than Bob?
In this case, Alice is not able to directly deliver the mail to Bob herself, so she must resort to delegating the delivery work to a courier.
To summarize our analogy, for Alice and Bob to exchange addresses and connect there are up to three possible methods (delivering directly themselves or with the help of a doorman and courier). Each requires a different approach. Mapping this analogy to WebRTC, a signaling server and other servers (i.e. the building doorman and courier) are required in order to reliably establish a WebRTC connection (i.e. to deliver mail).
Next, we will take a more technical look at these components and discuss how they work together.
Technical Discussion #
Signaling Server #
The sole responsibility of a signaling server is to relay messages between peers who wish to connect. This relay allows peers to exchange critical information required to establish a direct P2P connection. However, the WebRTC specification does not actually describe how to implement a signaling server. Instead, the implementation details are left to the developer, since an existing backend infrastructure (serving some other purpose) could also be utilized to serve this function.
The structure of the information relayed is governed by the Session Description Protocol (SDP), a simple key-value text-based protocol. Some of the information contained within the SDP includes:
The IP addresses through which each peer can be reached. The media streams, either audio, video, or both, that each peer wishes to send to the other peer. The different codecs available to both peers to encode and decode the media streams. In WebRTC terminology, initializing a call requires peer A to send an “offer” to peer B who responds with an “answer”. The offer and answer represent each peer’s respective session description and these are exchanged through a process known as “negotiation”. With this information a direct P2P connection can be established.
This exchange of session descriptions occurs during the initial phase of the call but also any time the state of the session changes. If a peer decides to send a new media stream or begins experiencing network issues, a new “offer” and “answer” will be dispatched between the peers through the signaling channel. It is therefore not uncommon to have multiple negotiation phases between peers during a single session. The ability of the underlying application to handle this uncertainty regarding the state of the session is crucial in providing a seamless user experience. This is easier said than done, which we will explore when discussing the engineering challenges that we faced while building Otter.
Network Address Translation #
One of the fundamental rules for all communication over the Internet is that every participating host must be assigned a public IP address. Under IPv4, an IP address represents a sequence of 32 bits divided into 4 octets of 8 bits each, which means that every octet has 2^8, or 256, possibilities. Therefore, there is an upper bound of ~4.3 billion on the total number of IPv4 addresses available in the world. With the ever-increasing number of devices connected to the Internet, engineers realized that this upper bound would be reached sooner than expected. To address this issue, Network Address Translation (NAT) was proposed.
The NAT solution allows hosts within a private network to share a pool of public IP addresses to communicate over the Internet. For example, an internal host who wishes to send a message over the Internet will first send it to their NAT device, which will then change the source IP address on the packet to a public IP address chosen from its pool of available IP addresses. The NAT device keeps track of which hosts are currently assigned a public IP address to be able to route messages from the Internet to the appropriate internal host. Even though NAT does address some problems related to the availability of IP addresses, it also creates new ones for UDP traffic.
Recall every TCP connection has a well-defined communication flow. NAT devices rely on this underlying flow to determine when a connection is first established and when it is closed. This allows a NAT device to do the following:
During the exchange to open a connection, assign a public IP address to an internal host for the lifetime of the connection. During the exchange of application data, route messages between the internal and external hosts. During the exchange to close the connection, remove the assigned public IP address and make it available to other internal hosts. UDP, on the other hand, is connectionless. Unpredictable connection state is a major issue for NAT devices as they can no longer rely on the underlying communication flow to manage outbound and inbound packets appropriately. This makes it difficult for internal hosts to maintain a stable communication channel with external hosts. Since WebRTC relies on UDP, how does it resolve the missing connection state?
STUN \u0026amp; TURN Servers #
The answer lies within the fact that both peers need a public IP address. Like the room numbers inside the different buildings, a private IP address is useless outside of its private network. The solution is a Session Traversal Utilities for NAT (STUN) server.
A STUN server allows hosts within a private network to programmatically create a mapping in the routing table of the NAT device. The response of the STUN server will include a header indicating the IP address and port of the NAT mapping. STUN also periodically sends empty messages through the NAT device, which benefits UDP traffic by keeping the NAT mapping and thus connection state alive. This mapping can be relayed to the other peer through the signaling channel. Both peers now have a public IP address. Connecting…
Not so fast! There are still situations where the above is not sufficient. When a NAT device creates a mapping within its routing table, it becomes responsible for routing outbound and inbound packets for the mapping. The way that inbound packets are routed and filtered can vary depending on the NAT device and its configuration.
In any case, inbound packets that are not allowed to use a specific mapping in the routing table are simply discarded by the NAT device. Depending on the filtering behavior of the NAT devices, communication between peers by using IP addresses and ports obtained through STUN servers may not be possible.
Furthermore, even if the NAT devices are not obstacles to a direct connection, private network firewalls can be. Firewalls can block traffic from certain port ranges or even block UDP traffic altogether. Analogous to how a courier helped Alice delegate her delivery, a workaround will be needed to establish a connection. The solution, a Traversal Using Relays around NAT (TURN) server.
If all else fails, a TURN server will act as a middleman between the peers. A peer that requires its packets to be relayed can simply send them to the TURN server. The TURN server then “dumbly” relays the packets to the other peer, without concern for its contents. The other peer is not aware that the packets are now being relayed.
Using a TURN server is a last resort as it adds latency to the communication and increases the operating costs of the system due to the significant bandwidth usage. However, to allow a seamless user experience, it is a required component of the overall infrastructure. In reality, the aforementioned scenario requiring a TURN server only affects a small percentage of end users. According to documentation from a Google application1:
92% of the time the connection can take place directly (STUN). 8% of the time the connection requires a relay (TURN). In summary, a successful connection requires both peers to gather multiple IP address and port pairs through which they could potentially be reached. In WebRTC terminology, a pair is known as a “candidate transport address”. These candidates are then exchanged between peers through the signaling channel. All possible combinations of candidates from both peers are then tested for connectivity establishment (i.e. if both peers have 3 candidates, 9 possible routes will be tested). Determining the most efficient path between peers on the network is critical and justifies the need for a STUN and TURN server in a WebRTC P2P topology.
Notes #
High Performance Browser Networking\u0026#160;\u0026#x21a9;\u0026#xfe0e;
`,
    }),
    e.add({
      id: 2,
      href: "/docs/case-study/existing-solutions/",
      title: "Existing Solutions",
      description: `WebRTC is a flexible solution for P2P real-time communication, but the trade-off of this flexibility is that a developer has to deal with the complexity of implementing critical components such as signaling and STUN/TURN servers. In addition, another layer of complexity is introduced when working with the WebRTC API.
To implement a P2P WebRTC solution, developers can take the DIY route and stitch together existing open-source solutions (PeerJS, CoTURN, etc). However, the developer would still need to configure and maintain all the necessary infrastructure to host their solution.`,
      content: `WebRTC is a flexible solution for P2P real-time communication, but the trade-off of this flexibility is that a developer has to deal with the complexity of implementing critical components such as signaling and STUN/TURN servers. In addition, another layer of complexity is introduced when working with the WebRTC API.
To implement a P2P WebRTC solution, developers can take the DIY route and stitch together existing open-source solutions (PeerJS, CoTURN, etc). However, the developer would still need to configure and maintain all the necessary infrastructure to host their solution.
On the other hand, there are commercial solutions like the Twilio SDK or Vonage SDK that make WebRTC easier to work with. They are easy to use and provide a fully-fledged SDK. Some commercial solutions even include a plug-and-play client app. However, they are not free and are not private in the sense that session data is kept within their infrastructure.
After examining the available options, we realized that there was a gap between the open-source and commercial solutions. While the open-source options are effective, they can be challenging and time-consuming to implement. Conversely, the commercial options are developer-friendly but come with a significant cost.
As a result, we chose to develop a simplified open-source alternative to Twilio that would be easy to deploy and scale, addressing the gaps we found in the existing open-source solutions.
`,
    }),
    e.add({
      id: 3,
      href: "/docs/case-study/how-otter-is-built/",
      title: "How Otter is Built",
      description: `Otter is a P2P video calling solution that can easily be integrated into new or existing web applications by developers. Otter’s infrastructure is deployed to the AWS Cloud and relies heavily on the serverless paradigm.
Otter is composed of the following:
An easy-to-use CLI that automates the deployment and tear-down of the infrastructure. A minimalistic API to allow developers to integrate Otter’s functionality within their own web application. A simple web application for P2P calls with audio and video, instant messaging and file exchange.`,

      content: `Otter is a P2P video calling solution that can easily be integrated into new or existing web applications by developers. Otter’s infrastructure is deployed to the AWS Cloud and relies heavily on the serverless paradigm.
Otter is composed of the following:
An easy-to-use CLI that automates the deployment and tear-down of the infrastructure. A minimalistic API to allow developers to integrate Otter’s functionality within their own web application. A simple web application for P2P calls with audio and video, instant messaging and file exchange. The real beauty of using Otter is that prior knowledge of WebRTC is not required!
Architecture Overview #
Next, we will explore the design decisions of how we built Otter. We split this exploration into three overall design objectives:
Provisioning the infrastructure to support video calling. Abstracting away the complexity of interacting with this video calling infrastructure. Allowing developers to integrate Otter into their applications. We segmented the architecture into logical groupings of components that together fulfill these objectives as they interact. We will refer to these groupings as stacks. The four stacks we will discuss are the Signaling stack, the STUN/TURN stack, the Frontend stack and the API stack.
Recall the components we needed for video calling in a P2P manner: a signaling server, a STUN server and a TURN server. The signaling server provides a way for peers to exchange Session Description information, including information provided by the STUN and TURN servers. The Signaling stack and STUN/TURN stack fulfill the first objective: to provide the infrastructure to support video calling.
However, without a way to interact with this infrastructure, a developer would still need to have an understanding of the WebRTC API to develop, test and deploy a video calling application.
The Frontend stack abstracts this complexity away from the developer by providing a video calling application which interacts with the Otter infrastructure. We will refer to this video calling application as the Otter Web App. Built with the WebRTC API and by consuming resources provided by the API stack, the Otter Web App offers audio/video calling, instant messaging, and file sharing between two peers. In addition, the Frontend stack manages hosting the Otter Web App.
To be considered a drop-in framework, developers need an easy way to integrate Otter into their applications. The API stack provides a route that dynamically generates a link to the Otter Web App for this purpose.
Let’s now peer into each stack.
The Signaling Stack #
The purpose of the signaling server in the context of WebRTC is to serve as a mechanism to transfer messages between peers. Recall, signaling is not defined in the RFC and instead left to the developer to implement.
We needed our signaling server to have the following qualities:
Low-latency for a real-time1 application (sub 100ms). Asynchronous, two-way communication between client and server. Scale to handle connections as needed. An option we considered was XHR polling, where a client periodically makes requests to the server asking for new data. However, polling “stretch[es] the original semantics of HTTP and that HTTP was not designed for bidirectional communication”.
Instead, the WebSocket protocol was a natural fit given our requirements. The protocol offers bidirectional communication (where the client and server can exchange data asynchronously), low latency (once a connection is established), and no limits on the number of concurrent connections.
Implementing WebSocket Communication Channels #
A typical WebSocket server will have the following:
Event listener for connecting clients and assigning an identifier to each client. Event listener for sending messages between clients, using the identifier of each client. Event listener for disconnecting clients and deleting the identifier for each client. Recall the nature of a WebRTC session is that media flows directly from browser to browser. This means once clients (peers) connect to the WebSocket server and pass their initial messages (offers and answers) to their peers to establish the WebRTC session, the WebSocket server typically remains idle. Peers must maintain long-lived connections to the server in the case of subsequent negotiations.
This traffic pattern implies bursts of requests to the WebSocket server on the initial set up of a WebRTC session, and intermittent or irregular requests thereafter. Thus, it would be appropriate for our WebSocket server to be able to handle bursty and irregular traffic on demand.
AWS API WebSocket Gateway was a perfect fit for these requirements and traffic patterns. The gateway would serve as a single endpoint for all clients and it would rely on event listeners to fulfill the functions of connecting clients and assigning identifiers, sending messages between clients using their identifiers, and disconnecting clients and removing their identifiers.
To serve the role of event listeners behind the gateway, we needed a service that would be on demand or event based, easy to manage and auto-scalable. AWS Lambdas were just the fit. Lambdas are a service provided by AWS that offer Functions-as-a-Service. Lambdas are considered serverless since a developer only needs to focus on core application logic, and need not provision nor manage servers that the code would otherwise need to run on. Another option would have been running a server on a EC2 instance, but the Lambdas made more sense given our event based traffic patterns and our approach towards low maintenance infrastructure.
We mapped each event listener to a separate Lambda: one for connecting clients and assigning identifiers; one for passing messages between connected clients; and another for disconnecting clients and removing their identifiers.
We were also able to use a Lambda to authorize access to the gateway, which will be discussed later in the Engineering Challenges.
We can see a natural separation of responsibilities between the WebSocket gateway and the Lambdas. The WebSocket gateway maintains long-lived connections with the clients, whereas the Lambdas are event based and are not regularly invoked after an initial WebRTC session is established. This lends well to their on demand nature.
Choosing the API WebSocket gateway came with two tradeoffs:
The gateway is stateless and needs to persist the identifiers assigned to each connected client. The gateway cannot broadcast or send messages to multiple client connections with a single API call. We were able to mitigate the first tradeoff by employing a database to persist the identifier assigned to each client as a key-value pair in a NoSQL database (DynamoDB) lookup table. The second tradeoff was a non-issue with a P2P topology: there was no need to broadcast messages to more than a few client connections (peers).
Choosing Lambdas came with two tradeoffs:
Cold starts: latency when a Lambda is first spun up. Limited execution time: a Lambda will be torn down after 15 minutes. These tradeoffs were acceptable considering the overall latency of setting up a WebRTC session was longer than that of the cold start and that each of our function calls to the Lambda were not computationally longer than a second.
The STUN/TURN Stack #
As we have previously discussed, establishing a direct peer-to-peer connection requires traversing multiple layers of NAT devices. Thus, a STUN server is required to allow both peers to acquire their public IP address. Furthermore, a direct connection between peers may not be possible under restrictive network configurations. Thus, a TURN server is required to relay the media for the session when needed.
To deploy a STUN/TURN server, we first needed to decide whether an open-source, a free third-party, or a DIY implementation would fit best within Otter.
Amongst the open-source options is CoTURN. CoTURN provides the functionality required for both STUN and TURN. Having a single component providing both functionalities would reduce the complexity of our infrastructure and its deployment. It is also the most widely used TURN server, open-source or otherwise, and has an active development community.
On the other hand, deploying CoTURN requires non-trivial configuration and the available documentation is limited. Moreover, deploying both STUN and TURN functionality within the same component does remove a degree of freedom, as it is no longer possible to scale one without the other. Considering these benefits and drawbacks, we decided to use CoTURN as it seemed like a natural fit for our application.
Interestingly, there are also publicly available STUN and TURN servers that are free to use. These servers are hosted by third-party providers such as Google. We decided against this option for two reasons: the inherent uncertainty around free services and whether or not they will continue to be free or available; and using a third-party TURN server defeats the purpose of a self-contained infrastructure in the context of privacy.
Lastly, we could have implemented a DIY STUN/TURN server, but given the time and complexity associated with this, we decided to focus on the core application functionality.
Deploying CoTURN #
We listed the following requirements as must-haves for the deployment of CoTURN:
Low maintenance. A public IP address. Ability to scale depending on the traffic load. With this in mind, we knew that CoTURN needed to be deployed in a serverless fashion to eliminate the maintenance associated with the underlying operating system. Additionally, it needed to be deployed within a public subnet to be able to relay media between peers. It also needed to be able to handle heavier traffic loads, otherwise it could become a bottleneck in the infrastructure if all other stacks auto-scaled and CoTURN did not.
Deploying CoTURN without having to manage the underlying server required a platform where software could run within a container. AWS Fargate is a service that developers can use to run containers without having to provision, configure, and maintain servers. This allows the developer to focus on the application’s core business logic. With AWS Fargate, we would be able to run CoTURN in a container with a public IP address within a public subnet.
To address scalability, we first needed to determine how many concurrent P2P sessions one instance of a CoTURN container could support. We considered the CPU and RAM available to an instance of a CoTURN container, and estimated that such an instance could handle up to 25 concurrent2 media relaying sessions. However, not all sessions require a TURN server; recall only 8% of P2P connections do, while the other 92% can be handled by a STUN server.
If 25 concurrent sessions represents 8% of P2P calls, then one instance can support around 310 total P2P concurrent sessions.
Therefore, an ideal scenario for auto-scaling would be to have at least one instance running at all times and to scale depending on the number of concurrent P2P sessions. Luckily, AWS Elastic Container Service (ECS) does just that.
AWS ECS is a fully managed container orchestration service. Otter’s STUN/TURN stack is an ECS Cluster of CoTURN containers. A service is configured to always maintain at least one instance within the cluster and to increase or decrease the number of instances depending on a target CPU utilization (i.e. 75%) within the cluster.
Given that the cluster may have multiple instances of CoTURN running, a new component was needed to direct incoming traffic within the cluster. We used a network load balancer to fulfill this task. Clients are only aware of the network load balancer endpoint. The ECS Service can scale as needed.
The above infrastructure has its merits, but it also has the following drawbacks:
There is a steep learning curve to get started with ECS as there are many different concepts involved (i.e. task definition, cluster, service discovery, health checks, etc). Fargate is generally more costly and less flexible than running the equivalent software on an EC2 instance. Monitoring and observability remain challenging with Fargate as containerized code is not easily accessible. Given the above downsides were not significant impediments to our application, it made sense to use ECS with Fargate for CoTURN.
The other competitive option to using Fargate would have been to deploy CoTURN on an EC2 instance. However, that would have involved maintenance of the virtual machine, something that Otter aims to avoid.
The Frontend Stack #
By this point, we have fulfilled the objective of setting up infrastructure to facilitate video calling. However, to use this infrastructure to host video calls, a developer would still have to interact with the WebRTC API to design, test and deploy their own frontend video calling application. In addition, a developer would need to host this frontend video calling application.
The purpose of the Frontend stack is to abstract away this complexity by providing and hosting the Otter Web App. The Otter Web App consumes two resources from the API stack (next stack discussed) that allow it to connect and plug into the infrastructure provided by the Signaling stack and STUN/TURN stack. The Otter Web App interacts with WebRTC API to handle offers, answers and set up connections between peers. Using these connections, peers can process video streams, share files and instant messages. When a user attempts to visit a link (generated using the API stack), the user will be served the Otter Web App, which will automatically join the video call associated with the given link (similar to how Google Meet works).
Sorry, your browser doesn't support embedded videos.
The hosting of the Otter Web App is accomplished using AWS Cloudfront (a Content Delivery Network), which distributes a website hosted in an AWS S3 bucket. While we considered a web server, we chose Cloudfront and S3 for several reasons. A web server seemed like overkill since the same static website is served for each request. Additionally, Cloudfront distributes content from edge locations that are closest to the end user, which can reduce the latency that the user experiences when loading the site.
The building of the Otter Web App was accomplished using an EC2 instance, but this presented a new set of challenges which will be discussed later.
The API Stack #
The API stack serves two purposes. First, it provides an easy way for developers to integrate Otter into their applications. This is achieved through a single route, namely /createRoom. Second, as we alluded to in the Frontend stack, it exposes resources that are consumed by the Otter Web App. This is achieved through two routes, namely /room/{id} and /credentials.
The /createRoom route allows a developer to issue an HTTP POST request in order to create a uniquely identifiable room resource. The room resource represents a virtual P2P session that will be hosted on the Otter Web App. The route performs the following tasks when triggered:
Creates the room resource and stores relevant meta-data into DynamoDB. Generates a unique URL that points to a Cloudfront Distribution where the Otter Web App is hosted. Appends the URL to the response body which is sent back to the developer. It is important to understand that this URL is bound to the room resource it was generated for. In other words, consuming the /createRoom endpoint is the only way to have a virtual P2P session hosted on the Otter Web App. A developer who uses Otter should only have to think about how to integrate this route into his own web application. Everything else is self-contained within Otter.
The two additional routes that the API stack provides, /room/{id} and /credentials, are consumed by the Otter Web App. The /room/{id} route fetches the meta-data of the associated room resource whereas the /credentials route fetches the time-limited credentials to access the functionality provided by the STUN/TURN stack. Once loaded, the Otter Web App issues a request to both routes in order to gather all the information required to start the virtual P2P session.
In short, the life cycle of a P2P session includes the following 5 API calls:
One API call (/createRoom issued by an end user) to create the room resource. Two API calls (/room/{id} issued by the Otter Web App for each peer) to fetch the room’s metadata. Two API calls (/credentials issued by the Otter Web App for each peer) to fetch the STUN/TURN stack credentials. Once the virtual P2P session has begun, all further traffic either flows directly between the peers or through the Signaling stack. It therefore did not make sense to have a server running at all times to handle these API calls. For every new virtual P2P session, the /room/{id} and /credentials routes will receive twice as much traffic as the /createRoom route therefore indicating a different computing need. Identifying these different needs allowed us to deploy an infrastructure that provides on-demand execution.
AWS Lambda not only provided us with this on-demand execution but also with minimal maintenance. This characteristic aligns with the drop-in nature of the Otter framework. Furthermore, AWS Lambda functions are also able to handle heavier traffic without any manual intervention. Since each session requires 5 API calls, this auto-scaling feature could become valuable when many virtual P2P sessions are initiated within a short period of time.
The API stack is thus composed of three distinct AWS Lambda functions, one for each route described above. The functions are connected to a DynamoDB database where the room resources are persisted. Furthermore, to have a single point of contact for these three different routes and to properly manage the communication between the client and the AWS Lambda functions, we deployed an AWS HTTP API Gateway in front of the functions. Therefore, all API calls are sent to the HTTP API Gateway which takes care of routing them to the appropriate handler.
Finally, we also have a Lambda Authorizer function attached to the gateway to control the access to the resources. We will explore the implementation of this authorizer within the Engineering Challenges section.
Architecture Summary #
In summary, we segmented our architecture into stacks (the Signaling stack, the STUN/TURN stack, the Frontend Stack, the API stack) that together fulfill three objectives:
Provisioning the infrastructure to support video calling. Abstracting away the complexity of interacting with this video calling infrastructure. Allowing developers to integrate Otter into their applications. The system altogether looks like the following:
Referring to the above diagram, the workflow of establishing a Otter video call after the infrastructure has been deployed is as follows:
Create room resource: The developer adds functionality (ie a button) which sends a POST request to the /createRoom resource and a room link is generated and sent to the user.
Load Otter Web App by visiting the room link: The Otter Web App is served from CloudFront.
Validate room, get TURN credentials: The Otter Web App validates the room with a GET request to the /room/{id} resource and fetches the CoTURN credentials with a GET request to the /credentials resource.
Connect with signaling server: The Otter Web App establishes a connection to the API WebSocket gateway.
Request public IP address candidates: The Otter Web App starts gathering candidate IP addresses to send as messages to exchange offers and answers.
Now the video call between peers can commence.
Otter not only reduces the overhead involved in the deployment and integration of the resources in the diagram above but also of these resource’s associated roles, policies, security groups, etc. In total, Otter ends up saving the developer over 100 steps with the creation and integration of all of these AWS resources and their associated entities.
Notes #
Defining “real-time” could be an entire separate discussion. Here, real-time means anything less than 100ms, since this latency generally is low enough to be unnoticed by humans; 1968 Paper by Robert Miller.\u0026#160;\u0026#x21a9;\u0026#xfe0e;
TURN Server Deployment Guide\u0026#160;\u0026#x21a9;\u0026#xfe0e;
`,
    }),
    e.add({
      id: 4,
      href: "/docs/case-study/engineering-challenges/",
      title: "Engineering Challenges",
      description: `The following is an in-depth discussion of 4 interesting engineering challenges we faced while building Otter.
WebRTC and Glare #
One challenge we faced working with the WebRTC API involved asynchronicity and race conditions. Ideally, the offer-answer process happens in an orderly fashion: one peer sends an offer, the other peer receives it and sends back an answer (if the other peer wishes to establish a P2P connection).
In practice, however, both peers can end up firing offers to each other in a haphazard fashion.`,

      content: `The following is an in-depth discussion of 4 interesting engineering challenges we faced while building Otter.
WebRTC and Glare #
One challenge we faced working with the WebRTC API involved asynchronicity and race conditions. Ideally, the offer-answer process happens in an orderly fashion: one peer sends an offer, the other peer receives it and sends back an answer (if the other peer wishes to establish a P2P connection).
In practice, however, both peers can end up firing offers to each other in a haphazard fashion. This process is called negotiation, and it happens during the initial setup of the WebRTC session and anytime a change to the communication environment requires reconfiguring the session.
Such a change could happen when adding or removing media from a live WebRTC connection. Recall the Session Description object contains information about media types and codecs, so by adding or removing media, a peer’s Session Description has changed. Thus, a new offer needs to be generated and sent to the remote peer.
However, what happens if peers trigger such a change simultaneously? When both peers send offers to each other at the same time it disrupts their state machines and this is known as “glare”.
The default way of negotiating the offer-answer process in WebRTC introduces race conditions that cannot be resolved on their own, resulting in deadlock and errors. User intervention is required, which naturally translates into a poor user experience.
Instead, we need a way to handle glare in a resilient and programmatic manner. We need to isolate the negotiation process from the rest of the application. Enter Perfect Negotiation: a “recommended pattern to manage negotiation transparently, abstracting this asymmetric task away from the rest of the application”. Perfect Negotiation works by assigning roles to either peer, where a peer’s role will specify the behavior to resolve any signaling collisions.
The two assigned roles are polite and impolite. A polite peer rescinds their offer in the face of an incoming offer, whereas an impolite peer ignores an incoming offer if it would collide with their own.
To implement Perfect Negotiation, we needed to add a couple of state variables to our peers: one to keep track if we are in the middle of an operation (recall the offer answer workflow is asynchronous), and another to indicate whether the peer is polite or impolite.
With Perfect Negotiation, we have resolved the race conditions that previously resulted in deadlock and poor user experience. Clients are able to add and remove media streams at will during a WebRTC session.
Signaling \u0026amp; DynamoDB Optimization #
Another challenge we faced was optimizing how signaling Lambdas interacted with DynamoDB. Let’s first understand how signaling Lambdas work with the WebSocket Gateway to send messages to a specific peer.
When a client establishes a connection with the WebSocket Gateway, the gateway creates a connectionId to uniquely identify this connection. Whenever the gateway receives a message from the client, this connectionId will be passed to the Lambda as a property of the context object. To send a message to a client, the Lambda only needs to know the connectionId of the client and make an API call to the gateway.
Recall that Otter has the concept of a “room” representing the virtual space where a session occurs. Every room has a roomId property to uniquely identify it. Otter stores the connectionId in the database with the roomId to keep track of the room a peer resides in. With this simple schema in place, the signaling Lambda can now query the database with the roomId, and pass the message if another peer is present. Initially, the message sent to the signaling Lambda had the following structure:
{ roomId: rm_42Y87ah8w, // used to find out if peer is in the same room payload: {} } Since the signaling Lambda has access to the sender’s connectionId, it can look up the roomId in the database and determine the other peer’s connectionId in order to pass the message to that peer. This approach is simple when sending and handling messages, however it also means the signaling Lambda will query DynamoDB for every message it receives.
Even without cold-starts, a signaling Lambda could take as long as ~1000ms when querying the database, which might be okay if we are only dealing with a few messages occasionally. However, under bursty traffic patterns, such slow performance could easily rack up compute time. Even worse, each peer connecting will send multiple candidate addresses asynchronously to the signaling Lambda. Each address triggers the Lambda to query the database for the same information.
In order to tackle this redundancy, the signaling Lambda should not have to determine the destination connectionId. Instead, we reasoned both “source” and “destination” connectionId‘s should be included in every message sent to the signaling Lambda. With the “destination” property, the signaling Lambda no longer needs to query the database to know where to send the message:
If the “source” property is null, the signaling Lambda can obtain the connectionId from the WebSocket Gateway and fill in the blank. If the “destination” property is null, the signaling Lambda can query the database (only once) and fill the blank. When the client receives a message from the other peer, it stores (or updates) both connectionIds locally and includes them when sending all subsequent messages. Now the messages have the following structure:
{ roomId: rm_42Y87ah8w, // in case destination is unknown, use this to find it out source: Fj294OwKs026928JK, // the connectionId for the peer that sends this message destination: KJS992hsdGHs091as, // the connectionId to send this message to polite: true, // used for perfect negotiation payload: {} } When establishing the initial WebRTC connection, since the client doesn’t know any of the connectionIds, the source and destination properties will be null. As we mentioned earlier, these two properties will be filled by the signaling Lambda. This information is stored locally and used in all subsequent messages.
Given the scenario of a typical P2P session with no reconnection, we managed to reduce the number of database queries from ~20 to just one. This approach reduced the latency caused by Lambda execution from ~1000 ms to ~200ms.
Static Site Generation \u0026amp; Authentication #
Another challenge we encountered was how to build and deploy the Otter Web App. In order to join a video call, the Otter Web App has to first send two requests to the Otter API to verify the call is valid and to fetch the CoTURN credentials. Next, the Otter Web App must connect to the Websocket gateway to initiate signaling, and potentially contact the STUN/TURN infrastructure.
To interact with this infrastructure, the Otter Web App has to know the infrastructure’s endpoints, which means the Otter Web App cannot be built until said infrastructure has been provisioned. Thus, the Otter Web App could not be built in advance, and had to be built during otter deploy.
To make this happen, otter deploy spins up an EC2 instance, and uploads the endpoints for the infrastructure to an S3 bucket. The EC2 instance pulls the code for the Otter Web App from Github, and retrieves the endpoints from the S3 bucket. The EC2 instance then builds the Otter Web App using these endpoints, and publishes it to another S3 bucket, which is associated with Cloudfront. The S3 bucket with the endpoints and the EC2 instance is then terminated, and the website is hosted on Cloudfront.
However, this solution introduced another problem: the endpoints for the video calling infrastructure are exposed in the Javascript that is served to the end user. This highlighted the need to implement authentication within the infrastructure.
To secure our infrastructure, we decided to require the use of an API key. During otter deploy, an API key is generated, stored in a new table in DynamoDB, and displayed in the CLI. An authorizer Lambda is attached to both the HTTP API gateway and the Websocket gateway; this Lambda checks that the API key in an incoming request matches an API key stored in the database, and allows and denies traffic accordingly.
Given that Otter is a drop-in service for an application, we made an assumption that the developer using Otter will already have their own backend infrastructure. To create a video call, a developer would include this API key when making a request from their backend to the Otter API’s “createRoom” route.
However, another problem surfaces concerning the Otter Web App. When a user clicks on the link to join a video call, the Otter Web App needs to send multiple requests to the Otter API; these requests must include an API key. However, the Otter Web App is exposed to the end user. How can the Otter Web App be authenticated, without exposing the API key to the end user?
To address this, we decided to implement JSON Web Tokens. A JSON Web Token (JWT) is a type of token used to securely transmit information (i.e. an API key) between parties.
When a request is sent to the Otter API’s “createRoom” route, the “createRoom” Lambda generates a JWT using the API key in the database and responds with a link to join the video call with the JWT in the query parameters.
When a user clicks on the link, the Otter Web App fetches the JWT from the query parameters of the URL and includes it in requests to the Otter infrastructure. The authorizer Lambda examines the JWT from the incoming request and verifies it using the API key stored in the database.
With this solution, accessing Otter’s infrastructure requires authorization, and the API key is not exposed to the end user.
CoTURN Session State \u0026amp; Sticky Session #
Deploying CoTURN to the cloud presented its own set of challenges. Two noteworthy ones were:
The need for a CoTURN instance to automatically detect its assigned public IP address. The need to track state across multiple CoTURN instances within the AWS ECS Cluster. Imagine peer A and peer B want to establish a direct peer-to-peer connection, where a TURN server is required for peer A. Both peers need to send their packets to CoTURN which would then relay them accordingly, but how do the peers determine what IP address to use?
When a new instance of CoTURN is launched within the cluster, we execute a script that relies on the Domain Name System (DNS) protocol to figure out the public IP address assigned to the container. Well-established providers such as OpenDNS or Google offer special hostnames that, when resolved, will return the IP address of the caller. This could also have been done by sending an HTTP request to specific providers that offer the public IP address in their response body. However, HTTP has more overhead, and parsing the response is more time-consuming than using DNS.
Now that CoTURN is aware of its IP address, Peer A asks CoTURN if it is able to relay packets to peer B. If successful, CoTURN allocates a session for peer A. This session indicates that CoTURN is stateful and consists primarily of the following: a public IP address which represents the IP address of CoTURN; a randomly chosen port for peer B to use to relay its packets to peer A; and a permission which indicates that only packets from peer B should be relayed back to peer A and all other packets should be discarded. The permission is primarily a security feature.
Once the session is allocated, peer A can send CoTURN’s IP address and chosen port to peer B through the signaling channel as usual.
To make sure that CoTURN has access to the client’s state when handling requests, we opted for sticky sessions applied by the network load balancer. The network load balancer assigns each client a CoTURN instance from the cluster for the duration of the connection. This was a straightforward approach and did not require any changes to our application. However, if an instance fails all associated client state is lost. Furthermore, sticky sessions can impede the ability of the network load balancer to distribute the incoming traffic evenly due to client state being present in the individual instances.
Another option could have been to use a key-value store to hold all session allocation states. In this case, all CoTURN instances need to have access to this store to retrieve the client’s state on each request. The individual CoTURN instances become stateless and there is no need for the network load balancer to apply sticky sessions anymore. However, the complexity of extracting the state from the instances and the increased latency to retrieve a particular client state from the store were significant enough to outweigh the benefits of this approach, especially compared to the simplicity of the sticky session approach
`,
    }),
    e.add({
      id: 5,
      href: "/docs/case-study/future-work/",
      title: "Future Work",
      description: `Even though Otter is a fully functional framework, we are still working on additional features.
First Improvement #
Currently, CoTURN is deployed within a single AWS region. Ideally, we would like to deploy CoTURN in multiple AWS regions and have clients access the nearest cluster of CoTURN servers through a geographical DNS resolution. The goal being to reduce the distance (i.e., latency) between end users and the relay server when required.`,

      content: `Even though Otter is a fully functional framework, we are still working on additional features.
First Improvement #
Currently, CoTURN is deployed within a single AWS region. Ideally, we would like to deploy CoTURN in multiple AWS regions and have clients access the nearest cluster of CoTURN servers through a geographical DNS resolution. The goal being to reduce the distance (i.e., latency) between end users and the relay server when required.
Second Improvement #
Otter only allows 1-on-1 calls. We would like to increase the number of peers that can participate in a video calling session to four as anything above this can become an issue as discussed in the “P2P vs Client-Server Network Topology” section.
Third Improvement #
Currently, access to the HTTP API Gateway is provided through an API key. We would like to add a route to the API to invalidate this API key and generate a new one. This way, a developer who integrates Otter within a web application has the possibility to automatically change the API key if it is exposed in any way.
`,
    }),
    e.add({
      id: 6,
      href: "/docs/case-study/references/",
      title: "References",
      description:
        " https://webrtcforthecurious.com/ https://hpbn.co/webrtc/ https://webrtc.org/ https://www.w3.org/TR/webrtc/ https://www.rfc-editor.org/rfc/rfc8489.html https://www.rfc-editor.org/rfc/rfc8656.html https://www.rfc-editor.org/rfc/rfc8445 https://www.rfc-editor.org/rfc/rfc2663 https://bloggeek.me/state-of-webrtc-open-source-projects/ https://docs.expertflow.com/chat/3.18/hybrid-chat-deployment/turn-server-deployment-guide ",
      content:
        " https://webrtcforthecurious.com/ https://hpbn.co/webrtc/ https://webrtc.org/ https://www.w3.org/TR/webrtc/ https://www.rfc-editor.org/rfc/rfc8489.html https://www.rfc-editor.org/rfc/rfc8656.html https://www.rfc-editor.org/rfc/rfc8445 https://www.rfc-editor.org/rfc/rfc2663 https://bloggeek.me/state-of-webrtc-open-source-projects/ https://docs.expertflow.com/chat/3.18/hybrid-chat-deployment/turn-server-deployment-guide ",
    }),
    e.add({
      id: 7,
      href: "/docs/case-study/",
      title: "Case Study",
      description: "Otter Case Study",
      content: "",
    }),
    e.add({
      id: 8,
      href: "/docs/documentations/",
      title: "Documentation",
      description: "Otter Documentations",
      content: "",
    }),
    e.add({
      id: 9,
      href: "/docs/documentations/quick-start/",
      title: "Quick Start",
      description: "Quick Start",
      content: `Prerequisites #
Using the Otter framework requires the following:
An AWS account. npm (Node Package Manager) installed. The following items are optional:
AWS CLI installed and configured. Otter relies heavily on AWS Lambda functions. Configuring the AWS Lambda concurrent execution limit to at least 50 will improve Otter\u0026rsquo;s performance. Installation #
To install the Otter npm package, open the terminal and run
npm i -g otter-video-cli
To get help, run otter or otter --help.
Otter CLI #
Executing otter deploy will provision and deploy Otter\u0026rsquo;s infrastructure and output the API endpoint along with the API key needed to integrate with Otter.
Sorry, your browser doesn't support embedded videos.
In addition, it will also create a sample room and output the URL to access it. In essence, it is possible for the developer to interact with Otter without ever writing a single line of code.
otter destroy will teardown the infrastructure deployed by otter deploy.
Create an Otter Room #
To create a new room for a video call, send a POST request to the /createRoom route with the API key specified in the Authorization header. The response includes a JSON object representing the room resource created. The url property of the object is the access key to the room. With this URL, an end user can access the Otter Web App.
Join an Otter Room #
To access a room, open a browser and visit the URL returned by the /createRoom route. Once the Otter Web App fully loaded, it will ask for permissions to access the audio and video devices of the computer. The video call will officially start when a second peer joins the room.
The Otter Web App has the following features:
Audio calling Video calling Instant messaging File sharing `,
    }),
    e.add({
      id: 10,
      href: "/docs/documentations/otter-api/",
      title: "Otter API",
      description: "Otter API Documentation",
      content: `Please refer to the official Otter API documentation here.
`,
    }),
    e.add({
      id: 11,
      href: "/docs/",
      title: "Docs",
      description: "Docs",
      content: "",
    }),
    search.addEventListener("input", t, !0);
  function t() {
    const s = 5;
    var n = this.value,
      o = e.search(n, {
        limit: s,
        enrich: !0,
      });
    const t = new Map();
    for (const e of o.flatMap((e) => e.result)) {
      if (t.has(e.doc.href)) continue;
      t.set(e.doc.href, e.doc);
    }
    if (
      ((suggestions.innerHTML = ""),
      suggestions.classList.remove("d-none"),
      t.size === 0 && n)
    ) {
      const e = document.createElement("div");
      (e.innerHTML = `No results for "<strong>${n}</strong>"`),
        e.classList.add("suggestion__no-results"),
        suggestions.appendChild(e);
      return;
    }
    for (const [r, a] of t) {
      const n = document.createElement("div");
      suggestions.appendChild(n);
      const e = document.createElement("a");
      (e.href = r), n.appendChild(e);
      const o = document.createElement("span");
      (o.textContent = a.title),
        o.classList.add("suggestion__title"),
        e.appendChild(o);
      const i = document.createElement("span");
      if (
        ((i.textContent = a.description),
        i.classList.add("suggestion__description"),
        e.appendChild(i),
        suggestions.appendChild(n),
        suggestions.childElementCount == s)
      )
        break;
    }
  }
})();
