// .husky/commitlint.formatter.js
module.exports = (input) => {
  const { results } = input;

  const examples = `
Exemplos válidos de commits:
  • feat: adiciona login com OAuth
  • fix: corrige bug no sidebar
  • chore: atualiza dependências
  • docs: atualiza README
  • style: ajusta indentação do ESLint
  • refactor: melhora performance do hook
  • test: adiciona testes para validação
  • ajuste: padding do botão
  • correcao: erro de ortografia no título
  • melhoria: performance do filtro
`;

  return results
    .map((result) =>
      result.errors
        .map((error) => {
          switch (error.name) {
            case "type-empty":
              return "❌ O tipo não pode estar vazio. / Type may not be empty." + "\n\n" + examples;
            case "subject-empty":
              return "❌ A descrição não pode estar vazia. / Subject may not be empty.";
            case "header-max-length":
              return "❌ O título está muito longo (máx 72). / Header too long (max 72).";
            case "type-enum":
              return (
                "❌ Tipo inválido. Use apenas os seguintes: feat, fix, chore, docs, style, refactor, test, ajuste, correcao, melhoria." +
                "\n\n" +
                examples
              );
            default:
              return `⚠️ ${error.message}`;
          }
        })
        .join("\n"),
    )
    .join("\n");
};
