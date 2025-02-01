window.onload = function () {
    // Define keywords and their corresponding URLs
    const internalLinks = {
        "Evaluation of Immunodeficiency": "https://www.pedia-time.com/2024/02/EvaluationImmunodeficiency.html",
        "Neutrophils": "https://www.pedia-time.com/2024/08/neutrophils.html",
        "Leukocytes": "https://www.pedia-time.com/2024/08/lymphocytes.html",
        "Eosinophils": "https://www.pedia-time.com/2024/08/eosinophils.html",
        "Basophils": "https://www.pedia-time.com/2024/08/basophils.html",
        "Asthma": "https://www.pedia-time.com/2023/05/asthma.html",
        "Anaphylaxis": "https://www.pedia-time.com/2023/12/Anaphylaxis.html"
        // Add more as needed
    };

    const seenKeywords = new Set(); // Track already linked keywords

    function linkKeyword(text, keyword, url) {
        const regex = new RegExp(`(^|\\s)(${keyword})(?=\\s|$)`, "i"); // Case-insensitive match
        return text.replace(regex, function (match, space, word) {
            if (!seenKeywords.has(keyword.toLowerCase())) {
                seenKeywords.add(keyword.toLowerCase());
                return `${space}<a href="${url}" target="_blank">${word}</a>`;
            }
            return match;
        });
    }

    // Process all paragraphs and divs containing text
    document.querySelectorAll("p, div").forEach(paragraph => {
        let paragraphText = paragraph.innerHTML;
        for (let keyword in internalLinks) {
            if (!seenKeywords.has(keyword.toLowerCase())) {
                paragraphText = linkKeyword(paragraphText, keyword, internalLinks[keyword]);
            }
        }
        paragraph.innerHTML = paragraphText;
    });
};
