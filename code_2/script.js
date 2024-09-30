// Add event listener to the form to handle submission
document.getElementById('keywordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the user input and split into words
    const userInput = document.getElementById('keywordInput').value.toLowerCase().trim();
    const resultDiv = document.getElementById('result');
    console.log("User Input:", userInput); // Debug: Check if input is being captured

    if (!userInput) {
        resultDiv.innerHTML = "<p>Please enter a complaint or keyword to analyze.</p>";
        return;
    }

    // Define a list of stop words to ignore
    const stopWords = ["the", "is", "in", "to", "and", "for", "a", "an", "of", "on", "at", "by", "with", "about", "as", "from", "that", "this", "it", "be", "or"];

    // Split the user input into individual words (by spaces)
    let words = userInput.split(/\s+/);

    // Filter out stop words
    words = words.filter(word => !stopWords.includes(word));

    // Debug: Check the filtered words
    console.log("Filtered Words:", words);

    // Define a comprehensive list of keywords and their respective IPC sections and punishments
    const ipcData = [
        {
            keywords: ["theft", "steal", "stole", "stolen", "stealing", "rob", "robbery", "burglary"],
            section: "Section 379",
            description: "Punishment for Theft",
            punishment: "Imprisonment of up to 3 years, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/76417350/"
        },
        {
            keywords: ["assault", "assaulted", "assaulting", "attack", "attacked", "attacking", "hit", "battery", "injure", "injured", "injuring"],
            section: "Section 351",
            description: "Punishment for Assault",
            punishment: "Simple or rigorous imprisonment for up to 3 months, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/154563748/"
        },
        {
            keywords: ["murder", "murdered", "murdering", "kill", "killed", "killing", "homicide", "slay", "manslaughter"],
            section: "Section 302",
            description: "Punishment for Murder",
            punishment: "Death, or Imprisonment for life, and shall also be liable to fine.",
            reference: "https://indiankanoon.org/doc/1120373/"
        },
        {
            keywords: ["fraud", "cheat", "cheated", "cheating", "deceive", "deceived", "deceiving", "scam", "scammed", "scamming"],
            section: "Section 420",
            description: "Punishment for Cheating",
            punishment: "Imprisonment of up to 7 years, and shall also be liable to fine.",
            reference: "https://indiankanoon.org/doc/90251163/"
        },
        {
            keywords: ["sedition", "rebel", "rebelling", "rebellion", "treason", "speech"],
            section: "Section 124A",
            description: "Punishment for Sedition",
            punishment: "Imprisonment for life, or up to 3 years with fine.",
            reference: "https://indiankanoon.org/doc/1641008/"
        },
        {
            keywords: ["defamation", "slander", "reputation"],
            section: "Section 499",
            description: "Defamation",
            punishment: "Imprisonment of up to 2 years, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/97252067/"
        },
        {
            keywords: ["Mob Lynching", "violence", "group attack", "vigilante", "justice"],
            section: "Section 223A",
            description: "Mob Lynching",
            punishment: "Imprisonment of up to 7 years.",
            reference: "https://indiankanoon.org/doc/1899358/"
        },
        {
            keywords: ["false promise to marry", "marriage", "marrying", "engagement"],
            section: "Section 493",
            description: "Cohabitation caused by a man deceitfully inducing belief of lawful marriage",
            punishment: "Imprisonment of up to 10 years, and shall also be liable to fine.",
            reference: "https://indiankanoon.org/doc/1732675/"
        },
        {
            keywords: ["suicide", "self-harm", "self harm"],
            section: "Section 309",
            description: "Attempt to Commit Suicide",
            punishment: "Simple imprisonment for up to 1 year or fine.",
            reference: "https://indiankanoon.org/doc/1474651/"
        },
        {
            keywords: ["gender neutrality", "gender", "gender equality", "rights"],
            section: "Section 354A",
            description: "Sexual harassment and punishment for sexual harassment",
            punishment: "Rigorous imprisonment of up to 3 years, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/152948503/"
        },
        {
            keywords: ["fake news", "information", "media", "misinformation", "false report"],
            section: "Section 153B",
            description: "Imputation, assertions prejudicial to national-integration",
            punishment: "Imprisonment of up to 3 years, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/191237800/"
        },
        {
            keywords: ["unnatural sexual offenses", "unnatural sexual offense", "consent", "forced sex", "sodomy"],
            section: "Section 377",
            description: "Unnatural Offenses",
            punishment: "Imprisonment of life, or imprisonment of up to 10 years, and fine.",
            reference: "https://indiankanoon.org/doc/1836974/"
        },
        {
            keywords: ["Adultery", "infidelity", "affair", "extramarital", "cheat", "betrayal"],
            section: "Section 497",
            description: "Adultery (Struck down by Supreme Court)",
            punishment: "None (Decriminalized)",
            reference: "https://indiankanoon.org/doc/192772915/"
        },
        {
            keywords: ["Cruelty", "husband", "relatives", "relative", "domestic", "torture", "abuse", "harassment"],
            section: "Section 498A",
            description: "Cruelty by Husband or Relatives of Husband",
            punishment: "Imprisonment of up to 3 years, and shall also be liable to fine.",
            reference: "https://indiankanoon.org/doc/43770801/"
        },
        {
            keywords: ["sexual assault", "rape", "sex", "forced sex", "consent", "sexual violence"],
            section: "Section 375",
            description: "Rape",
            punishment: "Imprisonment of not less than 7 years, may extend to life imprisonment.",
            reference: "https://indiankanoon.org/doc/152948503/"
        },
        {
            keywords: ["kidnap", "kidnapped", "kidnapping", "hostage", "confinement", "ransom", "freedom"],
            section: "Section 363",
            description: "Punishment for Kidnapping",
            punishment: "Imprisonment of up to 7 years, and shall also be liable to fine.",
            reference: "https://indiankanoon.org/doc/1131848/"
        },
        {
            keywords: ["extorsion", "blackmail", "extort"],
            section: "Section 384",
            description: "Punishment for Extortion",
            punishment: "Imprisonment of up to 3 years, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/23356863/"
        },
        {
            keywords: ["violence", "group attack", "mob justice"],
            section: "Section 147",
            description: "Rioting",
            punishment: "Imprisonment of up to 2 years, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/2037157/"
        },
        {
            keywords: ["fire", "arson", "burn", "burnt", "burned", "burns", "ablaze", "ablazed", "flames"],
            section: "Section 435",
            description: "Mischief by Fire or Explosive Substance",
            punishment: "Imprisonment of up to 7 years, or fine, or both.",
            reference: "https://indiankanoon.org/doc/1748717/"
        },
        {
            keywords: ["criminal conspiracy", "conspiracy"],
            section: "Section 120B",
            description: "Punishment for Criminal Conspiracy",
            punishment: "Imprisonment of up to 3 years, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/163130877/"
        },
        {
            keywords: ["drug offenses", "drug trafficking", "narcotics"],
            section: "Section 21 NDPS Act",
            description: "Punishment for contravention in relation to manufactured drugs and preparations",
            punishment: "Rigorous imprisonment for a term which shall not be less than 10 years.",
            reference: "https://indiankanoon.org/doc/151794237/"
        },
        {
            keywords: ["cybercrime", "online fraud", "internet crime", "hacking"],
            section: "Section 67 IT Act",
            description: "Punishment for publishing or transmitting obscene material in electronic form",
            punishment: "Imprisonment of up to 5 years, or fine up to 1 lakh rupees, or both.",
            reference: "https://indiankanoon.org/doc/163130877/"
        },
        {
            keywords: ["grievous hurt", "injury", "serious harm", "dangerous hurt"],
            section: "Section 325",
            description: "Punishment for Voluntarily Causing Grievous Hurt",
            punishment: "Imprisonment of up to 7 years, and shall also be liable to fine.",
            reference: "https://indiankanoon.org/doc/194159359/"
        },
        {
            keywords: ["public nuisance", "disturbance", "disruption"],
            section: "Section 268",
            description: "Public Nuisance",
            punishment: "Imprisonment of up to 6 months, or fine, or both.",
            reference: "https://indiankanoon.org/doc/173213527/"
        },
        {
            keywords: ["arson", "fire", "property damage"],
            section: "Section 436",
            description: "Mischief by Fire or Explosive Substance with Intent to Destroy House",
            punishment: "Imprisonment of life, or imprisonment of up to 10 years, and fine.",
            reference: "https://indiankanoon.org/doc/100471243/"
        },
        {
            keywords: ["forgery", "falsification", "fake document"],
            section: "Section 465",
            description: "Punishment for Forgery",
            punishment: "Imprisonment of up to 2 years, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/102720904/"
        },
        {
            keywords: ["trespass", "unlawful entry", "intrusion"],
            section: "Section 447",
            description: "Punishment for Criminal Trespass",
            punishment: "Imprisonment of up to 3 months, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/572960/"
        },
        {
            keywords: ["dacoity", "robbery", "gang robbery", "armed robbery"],
            section: "Section 395",
            description: "Punishment for Dacoity",
            punishment: "Imprisonment of life, or rigorous imprisonment of not less than 10 years.",
            reference: "https://indiankanoon.org/doc/174974183/"
        },
        {
            keywords: ["criminal intimidation", "threats", "coercion"],
            section: "Section 506",
            description: "Punishment for Criminal Intimidation",
            punishment: "Imprisonment of up to 2 years, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/42779199/"
        },
        {
            keywords: ["abetment", "abetting", "encouragement", "incitement"],
            section: "Section 107",
            description: "Abetment of a Thing",
            punishment: "Same as for the offense abetted.",
            reference: "https://indiankanoon.org/doc/1918452/"
        },
        {
            keywords: ["attempted murder", "attempt to kill"],
            section: "Section 307",
            description: "Attempt to Murder",
            punishment: "Imprisonment of up to 10 years, and shall also be liable to fine.",
            reference: "https://indiankanoon.org/doc/681197/"
        },
        {
            keywords: ["culpable homicide", "manslaughter"],
            section: "Section 304",
            description: "Culpable Homicide not amounting to Murder",
            punishment: "Imprisonment for life, or imprisonment of up to 10 years, and shall also be liable to fine.",
            reference: "https://indiankanoon.org/doc/306468/"
        },
        {
            keywords: ["dowry death", "bride killing", "dowry harassment"],
            section: "Section 304B",
            description: "Dowry Death",
            punishment: "Imprisonment of not less than 7 years, may extend to life imprisonment.",
            reference: "https://indiankanoon.org/doc/1412381/"
        },
        {
            keywords: ["grievous hurt", "serious injury", "dangerous harm"],
            section: "Section 320",
            description: "Grievous Hurt",
            punishment: "Imprisonment of up to 7 years, and shall also be liable to fine.",
            reference: "https://indiankanoon.org/doc/927144/"
        },
        {
            keywords: ["hurt", "injury", "pain"],
            section: "Section 323",
            description: "Punishment for Voluntarily Causing Hurt",
            punishment: "Imprisonment of up to 1 year, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/573674/"
        },
        {
            keywords: ["criminal force", "violence", "aggression"],
            section: "Section 349",
            description: "Criminal Force",
            punishment: "Imprisonment of up to 3 months, or fine, or both.",
            reference: "https://indiankanoon.org/doc/1518267/"
        },
        {
            keywords: ["wrongful restraint", "detaining", "restraining"],
            section: "Section 341",
            description: "Punishment for Wrongful Restraint",
            punishment: "Imprisonment of up to 1 month, or fine of up to five hundred rupees, or both.",
            reference: "https://indiankanoon.org/doc/1716187/"
        },
        {
            keywords: ["wrongful confinement", "unlawful confinement", "detention"],
            section: "Section 342",
            description: "Punishment for Wrongful Confinement",
            punishment: "Imprisonment of up to 1 year, or fine of up to 1,000 rupees, or both.",
            reference: "https://indiankanoon.org/doc/648750/"
        },
        {
            keywords: ["robbery", "theft", "burglary", "stealing"],
            section: "Section 392",
            description: "Punishment for Robbery",
            punishment: "Rigorous imprisonment for not less than 7 years.",
            reference: "https://indiankanoon.org/doc/501005/"
        },
        {
            keywords: ["stalking", "following", "harassment"],
            section: "Section 354D",
            description: "Stalking",
            punishment: "Imprisonment of up to 3 years for first conviction, and up to 5 years for subsequent conviction.",
            reference: "https://indiankanoon.org/doc/417128/"
        },
        {
            keywords: ["obscenity", "obscene acts", "public indecency"],
            section: "Section 294",
            description: "Obscene Acts and Songs",
            punishment: "Imprisonment of up to 3 months, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/1419072/"
        },
        {
            keywords: ["criminal breach of trust", "embezzlement", "fraud"],
            section: "Section 406",
            description: "Punishment for Criminal Breach of Trust",
            punishment: "Imprisonment of up to 3 years, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/191204/"
        },
        {
            keywords: ["unlawful assembly", "gathering", "mob"],
            section: "Section 141",
            description: "Unlawful Assembly",
            punishment: "Imprisonment of up to 6 months, or with fine, or both.",
            reference: "https://indiankanoon.org/doc/654987/"
        },
        {
            keywords: ["counterfeiting", "fake currency", "forgery"],
            section: "Section 489A",
            description: "Counterfeiting Currency Notes or Bank Notes",
            punishment: "Imprisonment of up to life, or imprisonment of up to 10 years, and shall also be liable to fine.",
            reference: "https://indiankanoon.org/doc/678793/"
        },
    ];

    console.log("IPC Data Loaded:", ipcData); // Debug: Check if IPC data is loaded

    // Create an array to store all the matching crimes
    let matchedCrimes = [];

    // Loop through each word in the user input
    words.forEach(word => {
        ipcData.forEach(item => {
            // Check if the current word matches any keyword in the crime item
            if (item.keywords.includes(word)) {
                matchedCrimes.push(item); // Add the matching crime to the list
            }
        });
    });

    // If any crimes were matched, display them
    if (matchedCrimes.length > 0) {
        resultDiv.innerHTML = `<h3>Relevant IPC Sections Found:</h3>`;
        matchedCrimes.forEach(crime => {
            resultDiv.innerHTML += `
                <p><strong>Section:</strong> ${crime.section}</p>
                <p><strong>Description:</strong> ${crime.description}</p>
                <p><strong>Punishment:</strong> ${crime.punishment}</p>
                <p><strong>Reference:</strong> <a href="${crime.reference}" target="_blank">Read More</a></p>
                <hr>
            `;
        });
    } else {
        // If no crimes are matched
        resultDiv.innerHTML = `<p>No relevant IPC sections found for the given complaint or keywords.</p>`;
    }
});
