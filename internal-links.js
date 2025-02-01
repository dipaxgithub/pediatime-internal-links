   window.onload = function () {    // Define keywords and their corresponding URLs

      const internalLinks = {
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

    const seenKeywords = new Set(); // Track already linked keywords

    function linkKeyword(text, keyword, url) {
        const regex = new RegExp(`(^|\\s)(${keyword})(?=\\s|$)`, &quot;i&quot;); // Improved regex for multi-word match
        return text.replace(regex, function (match, space, word) {
            if (!seenKeywords.has(keyword.toLowerCase())) {
                seenKeywords.add(keyword.toLowerCase());
                return `${space}<a href='${url}' target='_blank'>${word}</a>`;
            }
            return match;
        });
    }

    // Process all paragraphs and divs containing text
    document.querySelectorAll(&quot;p, div&quot;).forEach(paragraph =&gt; {
        let paragraphText = paragraph.innerHTML;
        for (let keyword in internalLinks) {
            if (!seenKeywords.has(keyword.toLowerCase())) {
                paragraphText = linkKeyword(paragraphText, keyword, internalLinks[keyword]);
            }
        }
        paragraph.innerHTML = paragraphText;
    });
};

 
