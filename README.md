# Projeto Unveil 

Esse projeto nasceu de uma oportunidade de desenvolver nas organiações em rede um maior acesso aos recursos atualmente existentes e diponíveis. Ele tem como primeira manifestação de ideal um <a href="https://medium.com/@faustovanin/manifesto-pelos-recursos-ocultos-6b62e7aba201"Manifesto pelos Recursos Ocultos</a>. Os principais princípios que norteiam esse manifesto e, consequentemente, esse projeto são:
* Autonomia plena de cada indivíduo sobre aquilo que compartilha e que demanda
* O valor gerado por um recurso que circula é muito maior do que a posse inativa
* Ter conhecimento da casa e seus recursos
* Aplicação da lógica de redes para conectar nós
* Sustentação da energia da rede pela intenção proposta e pelos recursos existentes

### Projeto Unveil 

Esse projeto nasce como uma proposta de entregar uma tecnologia que facilite a circulação de recursos entre pessoas que estão conectadas.
A ideia é de simplesmente prover uma interface para que as pessoas possa disponibilizar recursos para seus contatos da rede e, quando alguém tiver uma necessidade, possa fazer uma busca na aplicação e encontrar recursos disponíveis em sua rede de contatos (<em>n graus de separação</em>).

Para reproduzir as características das organizações em rede e os propósitos contidos no <a href="https://medium.com/@faustovanin/manifesto-pelos-recursos-ocultos-6b62e7aba201">Manifesto pelos Recursos Ocultos</a>, a aplicação terá as seguintes características em sua estrutura:

* **Dados:** Nenhum dado será armazenado de forma centralizada. Eles ficarão distribuídos nos recursos do próprio usuário e no primeiro nível de contato das redes em que participa. Será utilizada criptografia tanto para representar os dados (SHA-256) quanto para assinar digitalmente os dados criados (ECDSA).
* **Acesso:* A aplicação irá rodar praticamente toda no computador/celular do usuário. Por ess motivo foi escolhido o modelo de <a href="https://developers.google.com/web/progressive-web-apps/">Progressive Web Apps (PWA)</a>
* **Comunicação:* Toda a comunicação será feita em formato peer-to-peer, tanto para estabelecer a comunicação entre as pessoas da mesma rede quanto para propagar a disponibilização e a busca por recursos

### Tecnologias Utilizadas

A ferramenta é uma combinação de uma série de soluções, a sua maioria em Javascript/Node.JS. Portanto estão sendo utilizadas as seguintes ferramentas e padrões:
* **PWA/Polymer** Ferramenta para acelerar o desenvolvimento de aplicações no formato PWA
* **Curva Elípticas (ECDSA):** Utilizadas para criar o par de chave de acesso dos usuários com a bilioteca <a href="https://github.com/indutny/elliptic">Elliptic</a>
* **SHA256:** Para criptografar os dados dos usuários, com a biblioteca <a href="https://github.com/bitwiseshiftleft/sjcl/">SJCL</a>
* **Biometria do Usuário:** Para ter um fator adicional de autenticação, com a biblioteca <a href="https://tracking.js.com/">Tracking.js</a>
* **Geração de QR Code:** Cada usuário terá seu QR Code para poder adicionar facilmente outros contatos. Para isso, está sendo utilizada a biblioteca <a href="http://goqr.me/api/doc/create-qr-code/">Go QR</a>
* **Comunicação Peer-to-Peer:** Para realizar a comunicação entre as instãncias da aplicação está sendo utilizada a biblioteca <a href="https://socket.io">Socket.io</a>, em Node.JS no servidor de Signaling e no client Javascript dentro da aplicação. Ele será responsável pela troca de mensagens durante as buscas, sincronização de dados e disponibilização de recursos.

<p align="center">
  <a href="https://www.youtube.com/watch?v=HgJ0XCyBwzY&list=PLNYkxOF6rcIDdS7HWIC_BYRunV6MHs5xo&index=10">
    <img src="https://img.youtube.com/vi/HgJ0XCyBwzY/0.jpg" alt="Polymer Starter Kit 2 video">
  </a>
</p>

