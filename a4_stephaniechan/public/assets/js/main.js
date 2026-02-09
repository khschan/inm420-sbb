const resultCard = document.getElementById("result");
const wordTitle = document.getElementById("wordTitle");
const definitionText = document.getElementById("definition");

function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  if (!word) return;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      const definition =
        data[0].meanings[0].definitions[0].definition;

      wordTitle.textContent = word;
      definitionText.textContent = definition;

      resultCard.classList.remove("d-none", "show");
      void resultCard.offsetWidth; // re-trigger animation
      resultCard.classList.add("show");
    })
    .catch(() => {
      wordTitle.textContent = "huh?";
      definitionText.textContent = "i don't know that word... 🤔";

      resultCard.classList.remove("d-none", "show");
      void resultCard.offsetWidth;
      resultCard.classList.add("show");
    });
}

function searchSynonyms() {
  const word = document.getElementById("wordInput").value.trim();
  if (!word) return;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      const synonyms =
        data[0].meanings[0].definitions[0].synonyms;

      wordTitle.textContent = `${word} (synonyms)`;

      if (synonyms && synonyms.length > 0) {
        definitionText.textContent = synonyms.slice(0, 6).join(", ");
      } else {
        definitionText.textContent = "no synonyms found...your word is very unique 🤷‍♀️";
      }

      resultCard.classList.remove("d-none", "show");
      void resultCard.offsetWidth;
      resultCard.classList.add("show");
    })
    .catch(() => {
      wordTitle.textContent = "huh?";
      definitionText.textContent = "i don't know that word... 🤔";
      resultCard.classList.remove("d-none", "show");
      void resultCard.offsetWidth;
      resultCard.classList.add("show");
    });
}

function clearResult() {
  document.getElementById("wordInput").value = "";
  resultCard.classList.remove("show");
  resultCard.classList.add("d-none");
  wordTitle.textContent = "";
  definitionText.textContent = "";
}
