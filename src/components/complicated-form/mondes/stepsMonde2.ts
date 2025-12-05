import type { Step } from '../types';

export const stepsMonde2: Step[] = [
    {
        id: '1',
        question: 'Un kangourou vous propose un duel. L\'arme ?',
        choices: [
            { label: 'Un concours de grimaces', nextStep: '2A' },
            { label: 'Une partie d\'échecs sous l\'eau', nextStep: '2B' },
            { label: 'Un duel de regards intenses', nextStep: '2C' },
        ],
    },
    {
        id: '2A',
        question: 'Quelle odeur a la couleur bleue ?',
        choices: [
            { label: 'La myrtille avariée', nextStep: '3A-A' },
            { label: 'L\'ozone d\'un orage', nextStep: '3A-B' },
            { label: 'Le plastique neuf', nextStep: 'BOOM' },
        ],
    },
    {
        id: '2B',
        question: 'Si vous étiez une ligne de code, vous seriez...',
        choices: [
            { label: 'Une erreur fatale', nextStep: '3B-A' },
            { label: 'Une boucle infinie', nextStep: '3B-B' },
            { label: 'Un commentaire ignoré', nextStep: 'BOOM' },
        ],
    },
    {
        id: '2C',
        question: 'Combien de temps dure "toujours" ?',
        choices: [
            { label: '5 minutes', nextStep: '3C-A' },
            { label: 'Jusqu\'à ce que j\'ai faim', nextStep: '3C-B' },
            { label: 'C\'est déjà fini', nextStep: 'BOOM' },
        ],
    },
    {
        id: '3A-A',
        question: 'Couper ou coller ?',
        choices: [
            { label: 'Couper', nextStep: '4A-A' },
            { label: 'Coller', nextStep: '4A-A' },
            { label: 'Mixer', nextStep: '4A-A' },
        ],
    },
    {
        id: '3A-B',
        question: 'Un cône orange ?',
        choices: [
            { label: 'Oui', nextStep: '4A-B' },
            { label: 'Non', nextStep: '4A-B' },
            { label: 'Peut-être', nextStep: '4A-B' },
        ],
    },
    {
        id: '3B-A',
        question: 'Où stockez-vous vos secrets ?',
        choices: [
            { label: 'Nuage', nextStep: '4B-A' },
            { label: 'Coffre', nextStep: '4B-A' },
            { label: 'Tête', nextStep: '4B-A' },
        ],
    },
    {
        id: '3B-B',
        question: 'Aimez-vous être pisté ?',
        choices: [
            { label: 'Jamais', nextStep: '4B-B' },
            { label: 'Parfois', nextStep: '4B-B' },
            { label: 'Osef', nextStep: '4B-B' },
        ],
    },
    {
        id: '3C-A',
        question: 'Capturer l\'instant ?',
        choices: [
            { label: 'Clic', nextStep: '4C-A' },
            { label: 'Flash', nextStep: '4C-A' },
            { label: 'Vidéo', nextStep: '4C-A' },
        ],
    },
    {
        id: '3C-B',
        question: 'Démarrer ou écrire ?',
        choices: [
            { label: 'Démarrer', nextStep: '4C-B' },
            { label: 'Écrire', nextStep: '4C-B' },
            { label: 'Transcrire', nextStep: '4C-B' },
        ],
    },
    {
        id: '4A-A',
        question: 'Votre style ?',
        choices: [
            { label: 'Pro', nextStep: 'App-Kdenlive' },
            { label: 'Simple', nextStep: 'App-Openshot' },
            { label: 'Caotique', nextStep: 'App-OBS' },
        ],
    },
    {
        id: '4A-B',
        question: 'Compresser ?',
        choices: [
            { label: 'Fort', nextStep: 'App-HandBrake' },
            { label: 'Doux', nextStep: 'App-Peertube' },
            { label: 'Jamais', nextStep: 'App-VLC' },
        ],
    },
    {
        id: '4B-A',
        question: 'Navigateur ?',
        choices: [
            { label: 'Bleu', nextStep: 'App-NextCloud' },
            { label: 'Rouge', nextStep: 'App-Chromium' },
            { label: 'Orange', nextStep: 'App-QRPrint' },
        ],
    },
    {
        id: '4B-B',
        question: 'Un blaireau ou un masque ?',
        choices: [
            { label: 'Blaireau', nextStep: 'App-PrivacyBadger' },
            { label: 'Masque', nextStep: 'App-FacePrivacy' },
            { label: 'Bouclier', nextStep: 'App-uBlockOrigin' },
        ],
    },
    {
        id: '4C-A',
        question: 'Contrôler à distance ?',
        choices: [
            { label: 'Oui', nextStep: 'App-scrcpy' },
            { label: 'Non', nextStep: 'App-Ksnip' },
            { label: 'Télépathie', nextStep: 'App-LocalSend' },
        ],
    },
    {
        id: '4C-B',
        question: 'Disque ou Audio ?',
        choices: [
            { label: 'Disque', nextStep: 'App-CreatorDisk' },
            { label: 'Audio', nextStep: 'App-Logitranscribe' },
        ],
    },
    {
        id: 'BOOM',
        question: '💥 BOOM ! 💥',
        choices: [{ label: 'Retour au choix du monde', nextStep: 'RESET' }],
    },
    {
        id: 'App-Kdenlive',
        question: 'Votre résultat : Kdenlive',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Kdenlive' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Openshot',
        question: 'Votre résultat : Openshot / Shotcut',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Openshot' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-OBS',
        question: 'Votre résultat : OBS Studio / guvcview',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-OBS' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-VLC',
        question: 'Votre résultat : VLC',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-VLC' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-HandBrake',
        question: 'Votre résultat : HandBrake',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-HandBrake' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Peertube',
        question: 'Votre résultat : Peertube / PodEduc',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Peertube' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-NextCloud',
        question: 'Votre résultat : NextCloud Files',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-NextCloud' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Chromium',
        question: 'Votre résultat : Chromium',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Chromium' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-QRPrint',
        question: 'Votre résultat : QR Print',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-QRPrint' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-uBlockOrigin',
        question: 'Votre résultat : uBlock Origin',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-uBlockOrigin' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-PrivacyBadger',
        question: 'Votre résultat : Privacy Badger',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-PrivacyBadger' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-FacePrivacy',
        question: 'Votre résultat : Face Privacy',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-FacePrivacy' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Ksnip',
        question: 'Votre résultat : Ksnip',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Ksnip' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-scrcpy',
        question: 'Votre résultat : scrcpy',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-scrcpy' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-LocalSend',
        question: 'Votre résultat : LocalSend',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-LocalSend' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-CreatorDisk',
        question: 'Votre résultat : Créateur de disque de démarrage',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-CreatorDisk' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },
    {
        id: 'App-Logitranscribe',
        question: 'Votre résultat : Logitranscribe',
        choices: [
            { label: 'Visiter le site', nextStep: 'LINK-Logitranscribe' },
            { label: 'Retour au choix du monde', nextStep: 'RESET' },
        ],
    },

];
