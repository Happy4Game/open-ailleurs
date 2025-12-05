import type { Step } from '../types';

export const stepsMonde1: Step[] = [
    {
        id: '1',
        question: 'Vous trouvez une clé qui pleure. Que faites-vous ?',
        choices: [
            { label: 'Je la console avec un mouchoir en soie', nextStep: '2A' },
            { label: 'Je la plante dans le sol pour voir si elle pousse', nextStep: '2B' },
            { label: 'Je la fais fondre pour en faire une bague', nextStep: '2C' },
        ],
    },
    {
        id: '2A',
        question: 'Si le lundi était un objet, ce serait...',
        choices: [
            { label: 'Une éponge carrée', nextStep: '3A-A' },
            { label: 'Une trompette bouchée', nextStep: '3A-B' },
            { label: 'Un nuage en colère', nextStep: '3A-C' },
        ],
    },
    {
        id: '2B',
        question: 'Quelle est la meilleure vitesse pour un escargot ?',
        choices: [
            { label: 'La vitesse lumière', nextStep: '3B-A' },
            { label: 'La marche arrière', nextStep: '3B-B' },
            { label: 'L\'immobilité totale', nextStep: 'BOOM' },
        ],
    },
    {
        id: '2C',
        question: 'Choisissez un super-pouvoir inutile.',
        choices: [
            { label: 'Devenir invisible seulement quand personne ne regarde', nextStep: 'BOOM' },
            { label: 'Parler aux chaises (elles ne répondent pas)', nextStep: 'BOOM' },
            { label: 'Transformer l\'or en plomb', nextStep: 'BOOM' },
        ],
    },
    {
        id: '3A-A',
        question: 'Aimez-vous les vecteurs ?',
        choices: [
            { label: 'Oui', nextStep: '4A-A' },
            { label: 'Non', nextStep: '4A-A' },
            { label: 'Peut-être', nextStep: '4A-A' },
        ],
    },
    {
        id: '3A-B',
        question: 'Un bruit agréable ?',
        choices: [
            { label: 'Vague', nextStep: '4A-B' },
            { label: 'Moteur', nextStep: '4A-B' },
            { label: 'Silence', nextStep: '4A-B' },
        ],
    },
    {
        id: '3A-C',
        question: 'Votre maison idéale ?',
        choices: [
            { label: 'Château', nextStep: '4A-C' },
            { label: 'Cabane', nextStep: '4A-C' },
            { label: 'Bunker', nextStep: '4A-C' },
        ],
    },
    {
        id: '3B-A',
        question: 'Regardez-vous en haut ?',
        choices: [
            { label: 'Jamais', nextStep: '4B-A' },
            { label: 'Toujours', nextStep: '4B-A' },
            { label: 'La nuit', nextStep: '4B-A' },
        ],
    },
    {
        id: '3B-B',
        question: 'Imprimer en 3D ?',
        choices: [
            { label: 'Oui', nextStep: '4B-B' },
            { label: 'Non', nextStep: '4B-B' },
            { label: 'En tranches', nextStep: '4B-B' },
        ],
    },
    {
        id: '4A-A',
        question: 'Votre animal totem ?',
        choices: [
            { label: 'Chat', nextStep: 'App-Inkscape' },
            { label: 'Renard', nextStep: 'App-GIMP' },
            { label: 'Pingouin', nextStep: 'App-Krita' },
        ],
    },
    {
        id: '4A-B',
        question: 'Un instrument ?',
        choices: [
            { label: 'Clavier', nextStep: 'App-Rosegarden' },
            { label: 'Ciseaux', nextStep: 'App-Audacity' },
            { label: 'Micro', nextStep: 'App-Tenacity' },
        ],
    },
    {
        id: '4A-C',
        question: 'Meubles préférés ?',
        choices: [
            { label: 'En 3D', nextStep: 'App-SweetHome3D' },
            { label: 'En bois', nextStep: 'App-Blender' },
            { label: 'En code', nextStep: 'App-OpenSCAD' },
        ],
    },
    {
        id: '4B-A',
        question: 'Une planète ?',
        choices: [
            { label: 'Mars', nextStep: 'App-Stellarium' },
            { label: 'Pluton', nextStep: 'App-Celestia' },
            { label: 'Terre', nextStep: 'App-Cartes' },
        ],
    },
    {
        id: '4B-B',
        question: 'Forme préférée ?',
        choices: [
            { label: 'Cube', nextStep: 'App-FreeCAD' },
            { label: 'Roue', nextStep: 'App-BlocksCAD' },
            { label: 'Engrenage', nextStep: 'App-Slic3r' },
        ],
    },
    {
        id: 'BOOM',
        question: '💥 BOOM ! 💥',
        choices: [
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Inkscape',
        question: 'Votre résultat : Inkscape',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Inkscape' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-GIMP',
        question: 'Votre résultat : GIMP',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-GIMP' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Krita',
        question: 'Votre résultat : Krita',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Krita' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Rosegarden',
        question: 'Votre résultat : Rosegarden',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Rosegarden' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Audacity',
        question: 'Votre résultat : Audacity',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Audacity' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Tenacity',
        question: 'Votre résultat : Tenacity',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Tenacity' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-SweetHome3D',
        question: 'Votre résultat : SweetHome3D',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-SweetHome3D' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Blender',
        question: 'Votre résultat : Blender',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Blender' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-OpenSCAD',
        question: 'Votre résultat : OpenSCAD',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-OpenSCAD' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Stellarium',
        question: 'Votre résultat : Stellarium',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Stellarium' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Celestia',
        question: 'Votre résultat : Celestia',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Celestia' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Cartes',
        question: 'Votre résultat : Cartes.app / uMap',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Cartes' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-FreeCAD',
        question: 'Votre résultat : FreeCAD',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-FreeCAD' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-BlocksCAD',
        question: 'Votre résultat : BlocksCAD',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-BlocksCAD' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Slic3r',
        question: 'Votre résultat : Slic3r',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Slic3r' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
];
