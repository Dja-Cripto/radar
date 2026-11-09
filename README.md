# Radar

**Portal pessoal de oportunidades: vagas, clientes e publicações do LinkedIn, com o robô preparando e a pessoa decidindo.**

Criei o Radar para organizar a minha própria busca de emprego e a prospecção de clientes. Ele roda no meu servidor e eu uso todos os dias. É uma ferramenta de **um único usuário**, feita com Node.js e sem dependências externas.

![Visão geral do Radar, com dados de exemplo](docs/img/radar-visao-geral.webp)

*Painel com vagas de exemplo. A captura demonstra o fluxo e não representa uma busca real.*

## O que ele faz

| Módulo | O que acontece | Quem decide |
|---|---|---|
| **Vagas** | Busca diária em Gupy, Sólides, Empregos.com.br, Pandapé, Casa do Trabalhador, SineBahia, vagas remotas e Google Vagas. Filtra por nível, local e área e compara cada vaga com o meu currículo. | Eu me candidato, no site da empresa. |
| **Clientes** | Encontra empresas no Google Maps por nicho e região, dá uma nota de 0 a 100 com os motivos e escreve a primeira mensagem. | Eu envio, um a um. |
| **Publicações** | Escreve posts para o LinkedIn com IA, usando só fatos do meu currículo e das minhas histórias. Mostra "fatos usados pela IA" em cada post. | Nada é publicado sem a minha aprovação. |

## Decisões de projeto

- **O robô prepara, a pessoa decide.** Candidatura, mensagem a cliente e post são sempre ações manuais.
- **Honestidade nos números.** A nota de compatibilidade ajuda a priorizar e não promete chance de contratação. O painel separa o que foi preparado do que foi enviado.
- **Triagem explicável.** Vagas cortadas aparecem com o motivo (nível, local, área ou poucos requisitos do currículo).
- **Prospecção com limites.** Limite diário de e-mails, "Não quer contato" bloqueia a empresa e o telefone, e o Radar lembra do retorno depois de 4 dias.
- **Sem dependências para instalar.** Só o Node.js.

## Segurança

- Primeira abertura só no computador onde o Radar roda. Pela internet, a criação de usuário é recusada.
- Senha guardada apenas como hash (scrypt). Sessão em cookie protegido (HttpOnly, SameSite, Secure em HTTPS).
- Depois de 5 tentativas erradas, bloqueio de 15 minutos, que aumenta se continuar.
- Opcional: código de 6 dígitos por e-mail ao entrar de um computador novo.
- Chaves e dados pessoais ficam em arquivos que **nunca vão para o GitHub** (veja o `.gitignore`).
- Implantação em contêiner endurecido (`deploy/compose.yaml`): usuário sem privilégios, sistema de arquivos somente leitura e capacidades removidas.

## Como rodar

Requisito: [Node.js](https://nodejs.org) 18 ou mais novo.

```bash
node server.mjs
```

Abra http://localhost:8765. No Windows, `iniciar-radar.bat` faz o mesmo com dois cliques.

Para rodar os testes:

```bash
npm test
```

## Configuração (em Meu perfil)

| Recurso | Para quê | Onde conseguir |
|---|---|---|
| SerpApi | Google Vagas e busca de empresas no Google Maps | serpapi.com (250 buscas/mês grátis) |
| Serviço de IA compatível com OpenAI | Escrever posts e o banco de histórias | opencode.ai ou similar |
| Pixabay ou Pexels | Fotos reais para os posts | pixabay.com/api/docs ou pexels.com/api |
| Gmail + senha de app | E-mail aos clientes e lembretes dos posts | myaccount.google.com/apppasswords |

As chaves ficam só no computador de quem usa, em `.radar-jobs-state.json`.

## Estado atual

- **Funciona:** busca de vagas, comparação com o currículo, painel de candidaturas, campanhas de clientes e fila de publicações com aprovação.
- **Em evolução:** publicação automática pela API oficial do LinkedIn (hoje o Radar prepara o post e manda o lembrete com o botão "Publicar direto"), mais testes de busca e prospecção e proteção das configurações sensíveis.
- **Ainda não:** versão multiusuário. Só depois que o piloto provar valor.

## Documentação

- [`BUSCA_DE_VAGAS.md`](BUSCA_DE_VAGAS.md): fontes e regras de triagem.
- [`CLIENTES.md`](CLIENTES.md): prospecção.
- [`PUBLICACOES.md`](PUBLICACOES.md): LinkedIn com aprovação.
- [`INTEGRACAO_LINKEDIN.md`](INTEGRACAO_LINKEDIN.md): conexão oficial com o LinkedIn.
- [`PLANO_DO_PROJETO.md`](PLANO_DO_PROJETO.md): visão do produto.

## Sobre

Criado por **Daniel de Jesus** (estudante de Análise e Desenvolvimento de Sistemas), com IA como parceira de desenvolvimento e revisão, testes e decisões minhas.
[LinkedIn](https://www.linkedin.com/in/daniel-de-jesus-alves/) · [Portfólio](https://dja-portfolio.vercel.app)

> Código publicado para fins de portfólio. Sem licença de uso: todos os direitos reservados.
