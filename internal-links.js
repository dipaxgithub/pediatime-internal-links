// Fixed version of the auto-linking script
document.addEventListener("DOMContentLoaded", function () {
  // Define keywords and their corresponding URLs
  const links = {
    "Evaluation of Immunodeficiency":
      "https://www.pedia-time.com/2024/02/EvaluationImmunodeficiency.html",
    "Neutrophils": "https://www.pedia-time.com/2024/08/neutrophils.html",
    "Leukocytes": "https://www.pedia-time.com/2024/08/lymphocytes.html",
    "Eosinophils": "https://www.pedia-time.com/2024/08/eosinophils.html",
    "Basophils": "https://www.pedia-time.com/2024/08/basophils.html",
    "Mononuclear Phagocytes":
      "https://www.pedia-time.com/2024/02/Mononuclear-Phagocytes.html",
    "Natural Killer Cells": "https://www.pedia-time.com/2024/03/NK-Cells.html",
    "Disorders of Phagocyte Function":
      "https://www.pedia-time.com/2024/08/Disorders-Phagocyte-Function.html",
    "Complementary System":
      "https://www.pedia-time.com/2024/02/complement-system.html",
    "Defects of Innate Immunity":
      "https://www.pedia-time.com/2024/08/Defects-Innate-Immunity.html",
    "Primary Defects of Cellular Immunity":
      "https://www.pedia-time.com/2023/12/defects-of-cellular-immunity.html",
    "Primary Defects of Antibody Production":
      "https://www.pedia-time.com/2024/03/Defects-Antibody-Production.html",

    "Juvenile Idiopathic Arthritis":
      "https://www.pedia-time.com/2023/12/juvenile-idiopathic-arthritis.html",
    "Ankylosing Spondylitis":
      "https://www.pedia-time.com/2023/12/juvenile-ankylosing-spondylitis.html",
    "Reactive Arthritis":
      "https://www.pedia-time.com/2023/12/reactive-arthritis.html",
    "systemic lupus erythematosus":
      "https://www.pedia-time.com/2023/12/systemic-lupus-erythematosus.html",
    "Juvenile Dermatomyositis":
      "https://www.pedia-time.com/2023/12/juvenile-dermatomyositis.html",
    "Scleroderma": "https://www.pedia-time.com/2023/12/scleroderma.html",
    "Behçet Disease": "https://www.pedia-time.com/2024/02/behcet-disease.html",
    "Sjögren Syndrome":
      "https://www.pedia-time.com/2023/12/sjogren-syndrome.html",
    "Familial Mediterranean Fever":
      "https://www.pedia-time.com/2023/05/Familial-Mediterranean-Fever.html",
    "Amyloidosis": "https://www.pedia-time.com/2023/05/amyloidosis.html",
    "Sarcoidosis": "https://www.pedia-time.com/2023/12/sarcoidosis.html",
    "Kawasaki Disease":
      "https://www.pedia-time.com/2024/02/kawasaki-disease.html",
    "Polyarteritis Nodosa":
      "https://www.pedia-time.com/2024/02/polyarteritis-nodosa.html",
    "Takayasu Arteritis":
      "https://www.pedia-time.com/2024/02/takayasu-arteritis.html",
    "Henoch-Schönlein Purpura":
      "https://www.pedia-time.com/2024/02/henoch-schonlein-purpura.html",

    "Allergic Rhinitis":
      "https://www.pedia-time.com/2024/02/allergic-rhinitis.html",
    "Asthma": "https://www.pedia-time.com/2023/05/asthma.html",
    "Atopic Dermatitis":
      "https://www.pedia-time.com/2024/03/atopic-dermatitis.html",
    "Insect Allergy": "https://www.pedia-time.com/2023/05/insect-allergy.html",
    "Urticaria": "https://www.pedia-time.com/2023/05/urticaria.html",
    "Anaphylaxis": "https://www.pedia-time.com/2023/12/Anaphylaxis.html",
    "Serum Sickness": "https://www.pedia-time.com/2023/05/serum-sickness.html",
    "Food Allergy": "https://www.pedia-time.com/2023/12/food-allergy.html",
    "Adverse Reactions to Drugs":
      "https://www.pedia-time.com/2023/05/adverse-drugs-reactions.html",
  };

  const maxLinksPerKeyword = 2;
  const maxLinksPerParagraph = 1;

  function autoLinkContent(content) {
    // Create a temporary element to safely parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Get text nodes only
    const walk = document.createTreeWalker(
      tempDiv,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const keywordCounts = {};
    let node;

    while ((node = walk.nextNode())) {
      if (node.parentNode.nodeName !== "A") {
        // Skip if parent is already a link
        for (const [keyword, url] of Object.entries(links)) {
          const keywordLower = keyword.toLowerCase();
          if (!keywordCounts[keywordLower]) {
            keywordCounts[keywordLower] = 0;
          }

          const regex = new RegExp(
            `\\b${keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`,
            "gi"
          );

          let match;
          let lastIndex = 0;
          let newContent = "";

          while ((match = regex.exec(node.textContent)) !== null) {
            if (keywordCounts[keywordLower] < maxLinksPerKeyword) {
              newContent += node.textContent.substring(lastIndex, match.index);
              newContent += `<a href="${url}" target="_blank">${match[0]}</a>`;
              lastIndex = regex.lastIndex;
              keywordCounts[keywordLower]++;
            }
          }

          if (newContent) {
            newContent += node.textContent.substring(lastIndex);
            const newNode = document.createElement("span");
            newNode.innerHTML = newContent;
            node.parentNode.replaceChild(newNode, node);
          }
        }
      }
    }

    return tempDiv.innerHTML;
  }

  function processBlogContent() {
    const postContent = document.querySelectorAll(".post-body");

    postContent.forEach(function (post) {
      const paragraphs = post.children;
      let linksAddedInParagraph = 0;

      Array.from(paragraphs).forEach((paragraph) => {
        if (paragraph.tagName === "P") {
          let hasKeyword = Object.keys(links).some((keyword) =>
            paragraph.textContent.toLowerCase().includes(keyword.toLowerCase())
          );

          if (hasKeyword && linksAddedInParagraph < maxLinksPerParagraph) {
            paragraph.innerHTML = autoLinkContent(paragraph.innerHTML);
            linksAddedInParagraph++;
          }
        }
      });
    });
  }

  processBlogContent();
});
