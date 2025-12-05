import type { Step } from '../types';

export const stepsMonde3: Step[] = [
    {
        id: '1',
        question: 'Vous devez manger un concept abstrait. Lequel ?',
        choices: [
            { label: 'La mélancolie (c\'est salé)', nextStep: '2A' },
            { label: 'L\'algèbre (c\'est piquant)', nextStep: '2B' },
            { label: 'La grammaire (c\'est sec)', nextStep: '2C' },
        ],
    },
    {
        id: '2A',
        question: 'Votre chapeau idéal pour coder ?',
        choices: [
            { label: 'Casque de scaphandrier', nextStep: '3A-A' },
            { label: 'Entonnoir en aluminium', nextStep: '3A-B' },
            { label: 'Casquette à hélice', nextStep: 'BOOM' },
        ],
    },
    {
        id: '2B',
        question: 'Qui est le meilleur professeur ?',
        choices: [
            { label: 'Robot dépressif', nextStep: '3B-A' },
            { label: 'Équerre magique', nextStep: '3B-B' },
            { label: 'Cahier qui mord', nextStep: 'BOOM' },
        ],
    },
    {
        id: '2C',
        question: 'Sur quoi écrivez-vous ?',
        choices: [
            { label: 'Parchemin de dragon', nextStep: '3C-A' },
            { label: 'Post-it géant', nextStep: '3C-B' },
            { label: 'Tablette de pierre', nextStep: '3C-C' },
        ],
    },
    {
        id: '3A-A',
        question: 'Serpent ou Gemme ?',
        choices: [
            { label: 'Serpent', nextStep: '4A-A' },
            { label: 'Gemme', nextStep: '4A-A' },
            { label: 'Carnet', nextStep: '4A-A' },
        ],
    },
    {
        id: '3A-B',
        question: 'Un chat orange ?',
        choices: [
            { label: 'Oui', nextStep: '4A-B' },
            { label: 'Non', nextStep: '4A-B' },
            { label: 'Tortue', nextStep: '4A-B' },
        ],
    },
    {
        id: '3B-A',
        question: 'Tableau blanc ?',
        choices: [
            { label: 'Oui', nextStep: '4B-A' },
            { label: 'Non', nextStep: '4B-A' },
            { label: 'Web', nextStep: '4B-A' },
        ],
    },
    {
        id: '3B-B',
        question: 'Géométrie ?',
        choices: [
            { label: 'Oui', nextStep: '4B-B' },
            { label: 'Non', nextStep: '4B-B' },
            { label: 'Clavier', nextStep: '4B-B' },
        ],
    },
    {
        id: '3C-A',
        question: 'Formule mathématique ?',
        choices: [
            { label: 'Complexe', nextStep: '4C-A' },
            { label: 'Simple', nextStep: '4C-A' },
            { label: 'Aucune', nextStep: '4C-A' },
        ],
    },
    {
        id: '3C-B',
        question: 'Modifier un PDF ?',
        choices: [
            { label: 'Couper', nextStep: '4C-B' },
            { label: 'Annoter', nextStep: '4C-B' },
            { label: 'Lire', nextStep: '4C-B' },
        ],
    },
    {
        id: '3C-C',
        question: 'Des idées en vrac ?',
        choices: [
            { label: 'Oui', nextStep: '4C-C' },
            { label: 'Arbre', nextStep: '4C-C' },
            { label: 'Non', nextStep: '4C-C' },
        ],
    },
    {
        id: '4A-A',
        question: 'Outil ?',
        choices: [
            { label: 'Couteau', nextStep: 'App-Python' },
            { label: 'Marteau', nextStep: 'App-VSCodium' },
            { label: 'Git', nextStep: 'App-Jupyter' },
        ],
    },
    {
        id: '4A-B',
        question: 'Briques ou Lignes ?',
        choices: [
            { label: 'Briques', nextStep: 'App-Scratch' },
            { label: 'Lignes', nextStep: 'App-GeoTortue' },
            { label: 'Câbles', nextStep: 'App-ArduinoIDE' },
        ],
    },
    {
        id: '4B-A',
        question: 'Discuter ?',
        choices: [
            { label: 'Visio', nextStep: 'App-OpenBoard' },
            { label: 'Chat', nextStep: 'App-Mattermost' },
            { label: 'Forum', nextStep: 'App-doDoc' },
        ],
    },
    {
        id: '4B-B',
        question: 'Quiz ?',
        choices: [
            { label: 'Oui', nextStep: 'App-Geogebra' },
            { label: 'Clavier', nextStep: 'App-Klavaro' },
            { label: 'Portail', nextStep: 'App-PortailForge' },
        ],
    },
    {
        id: '4C-A',
        question: 'Mise en page ?',
        choices: [
            { label: 'Livre', nextStep: 'App-LaTeX' },
            { label: 'Lettre', nextStep: 'App-LibreOffice' },
            { label: 'Journal', nextStep: 'App-Scribus' },
        ],
    },
    {
        id: '4C-B',
        question: 'Pour qui ?',
        choices: [
            { label: 'L\'imprimeur', nextStep: 'App-PDFsam' },
            { label: 'Profs', nextStep: 'App-PDF4Teachers' },
            { label: 'Moi', nextStep: 'App-Calibre' },
        ],
    },
    {
        id: '4C-C',
        question: 'Code ou Texte ?',
        choices: [
            { label: 'Texte', nextStep: 'App-Basket' },
            { label: 'Code', nextStep: 'App-FreePlane' },
            { label: 'Étiquette', nextStep: 'App-gLabels' },
        ],
    },
    {
        id: 'BOOM',
        question: '💥 BOOM ! 💥',
        choices: [{ label: 'Retour au choix du monde', nextStep: 'RESET' }],
    },
    {
        id: 'App-Python',
        question: 'Votre résultat : Python / Thonny',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Python' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-VSCodium',
        question: 'Votre résultat : VSCodium / Sqlite browser',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-VSCodium' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Jupyter',
        question: 'Votre résultat : Jupyter notebook / Git',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Jupyter' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Scratch',
        question: 'Votre résultat : Scratch',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Scratch' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-GeoTortue',
        question: 'Votre résultat : GeoTortue',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-GeoTortue' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-ArduinoIDE',
        question: 'Votre résultat : Arduino IDE',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-ArduinoIDE' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-OpenBoard',
        question: 'Votre résultat : OpenBoard',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-OpenBoard' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Mattermost',
        question: 'Votre résultat : Mattermost',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Mattermost' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-doDoc',
        question: 'Votre résultat : do•doc / La Digitale',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-doDoc' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Geogebra',
        question: 'Votre résultat : Geogebra',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Geogebra' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Klavaro',
        question: 'Votre résultat : Klavaro / Logiqizz',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Klavaro' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-PortailForge',
        question: 'Votre résultat : Portail primaire de la Forge',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-PortailForge' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-LaTeX',
        question: 'Votre résultat : LaTeX',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-LaTeX' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-LibreOffice',
        question: 'Votre résultat : LibreOffice / Only Office',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-LibreOffice' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Scribus',
        question: 'Votre résultat : Scribus',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Scribus' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-PDFsam',
        question: 'Votre résultat : PDFsam / pdf.24eme.fr',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-PDFsam' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-PDF4Teachers',
        question: 'Votre résultat : PDF4Teachers / Xournal++ / Okular',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-PDF4Teachers' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Calibre',
        question: 'Votre résultat : Calibre / Foliate',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Calibre' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Basket',
        question: 'Votre résultat : Basket',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Basket' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-FreePlane',
        question: 'Votre résultat : FreePlane / Geany',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-FreePlane' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-gLabels',
        question: 'Votre résultat : gLabels',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-gLabels' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },

];
