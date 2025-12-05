import { useState } from 'react';
import type { Step, Choice, ValiderFunction } from './types';
import { stepsMonde1 } from './mondes/stepsMonde1';
import { stepsMonde2 } from './mondes/stepsMonde2';
import { stepsMonde3 } from './mondes/stepsMonde3';
import { appLinks } from './appLinks';

// 👉 On importe ton portail
import { PortalIntention } from './PortalIntention';

type ComplicatedFormProps = {
    onValider?: ValiderFunction;
};

type Monde = 'Monde1' | 'Monde2' | 'Monde3';

export const ComplicatedForm = ({ onValider }: ComplicatedFormProps) => {
    const [selectedMonde, setSelectedMonde] = useState<Monde | null>(null);
    const [currentStepId, setCurrentStepId] = useState<string | null>(null);

    // 👉 Ajout : état pour ouvrir la page PortailIntention
    const [showPortail, setShowPortail] = useState(false);

    const getSteps = (): Step[] => {
        switch (selectedMonde) {
            case 'Monde1':
                return stepsMonde1;
            case 'Monde2':
                return stepsMonde2;
            case 'Monde3':
                return stepsMonde3;
            default:
                return [];
        }
    };

    const handleMondeSelect = (monde: Monde) => {
        setSelectedMonde(monde);
        const steps = getStepsForMonde(monde);
        setCurrentStepId(steps[0].id);
    };

    const getStepsForMonde = (monde: Monde): Step[] => {
        switch (monde) {
            case 'Monde1':
                return stepsMonde1;
            case 'Monde2':
                return stepsMonde2;
            case 'Monde3':
                return stepsMonde3;
        }
    };

    const handleChoice = (choice: Choice) => {
        if (!currentStepId) return;

        if (choice.nextStep.startsWith('LINK-')) {
            const appName = choice.nextStep.replace('LINK-', '');
            const url = appLinks[appName];
            if (url) window.open(url, '_blank');
            return;
        }

        if (choice.nextStep === 'RESET') {
            setSelectedMonde(null);
            setCurrentStepId(null);
            return;
        }

        if (onValider) onValider(currentStepId, choice.label);
        if (choice.nextStep) setCurrentStepId(choice.nextStep);
    };

    // -----------------------------------------------------
    //          PAGE PORTAIL D’INTENTION
    // -----------------------------------------------------
    if (showPortail) {
        return <PortalIntention />;
    }

    // -----------------------------------------------------
    //    PAGE DE SÉLECTION DU MONDE + PORTAIL
    // -----------------------------------------------------
    if (!selectedMonde) {
        return (
            <div className="monde-selection">
                <h2>Point d’entrée du multivers :</h2>

                {/* --- BOUTON PORTAIL D'INTENTION --- */}
                <button
                    onClick={() => setShowPortail(true)}
                    className="portail-button"
                >
                    🔮 Ouvrir le Portail d’Intention
                </button>

                <h3>Ou choisir un monde :</h3>

                <button onClick={() => handleMondeSelect('Monde1')}>
                    Monde 1 : Archipel des Formes
                </button>
                <button onClick={() => handleMondeSelect('Monde2')}>
                    Monde 2 : Studio Dynamique
                </button>
                <button onClick={() => handleMondeSelect('Monde3')}>
                    Monde 3 : Cité Logique
                </button>
            </div>
        );
    }

    const steps = getSteps();
    const currentStep = steps.find((s) => s.id === currentStepId);
    if (!currentStep) return <div>Étape inconnue...</div>;

    return (
        <div className="adaptive-form">
            <h2>{currentStep.question}</h2>
            <div className="choices">
                {currentStep.choices.map((c) => (
                    <button
                        key={c.label}
                        onClick={() => handleChoice(c)}
                        className="choice-button"
                    >
                        {c.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
