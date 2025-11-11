// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 100],
    "header-min-length": [2, "always", 10],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "type-enum": [
      2,
      "always",
      [
        "feat", // funcionalidade
        "fix", // correção
        "chore", // tarefa
        "docs", // documentação
        "style", // formatação
        "refactor", // refatoração
        "test", // testes
        "ajuste", // português: ajuste pequeno
        "correcao", // português: correção
        "melhoria", // português: melhoria
      ],
    ],
  },
  formatter: "./.husky/commitlint.formatter.js",
};
