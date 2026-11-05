# Projeto SAEP — Cadastro de Funcionários (visual verde-petróleo)

Frontend **React Native + Expo** do cadastro de funcionários, com novo visual.

## Mudanças visuais

- Paleta verde-petróleo, verde-sálvia e areia, substituindo o azul.
- Cabeçalho compacto, formulário em cartão e campos com rótulos visíveis.
- Campos organizados em duas colunas em telas largas e uma coluna no celular.
- Lista com avatar de iniciais e botão de edição discreto.
- Largura máxima para que o conteúdo fique bem distribuído no navegador.
- Mantido o funcionário fictício **Juliana Martins**, com CPF ilustrativo (não válido).

## Funcionalidades preservadas

- Cadastrar funcionários.
- Listar funcionários.
- Editar funcionários e cancelar a edição.
- Buscar endereço pelo CEP via ViaCEP, com preenchimento manual como alternativa.

Sem painel administrativo, exclusão, relatórios ou bibliotecas extras. O projeto continua usando
**dados em memória**: os novos cadastros não persistem após recarregar a página. O backend Java
não está integrado a este frontend.

## Executar no Windows (VS Code)

1. Extraia o arquivo ZIP e abra a pasta `meu-projeto` no VS Code.
2. Instale Node.js, caso ainda não tenha instalado.
3. No terminal do VS Code, execute os comandos abaixo, um por vez:

```powershell
npm ci
npx expo start
```

4. Pressione `w` para abrir a versão web ou leia o QR Code com Expo Go no Android.

Se estiver com um Expo anterior aberto, encerre-o com `Ctrl+C` antes de iniciar novamente.

## Estrutura principal

- `App.js`: entrada da interface.
- `src/pages/Home.js`: cabeçalho, formulário e listagem.
- `src/pages/Editar.js`: edição de cadastro.
- `src/components/Formulario.js`: campos e consulta ViaCEP.
- `src/data/data.js`: funcionário fictício inicial.
- `src/styles/cores.js`: paleta de cores (centralizada para facilitar mudanças).
- `package.json` / `package-lock.json`: dependências do projeto.
