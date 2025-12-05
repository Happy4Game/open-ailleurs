import { useState } from 'react';
import type { Step, Choice, ValiderFunction } from './types';
import { stepsMonde1 } from './mondes/stepsMonde1';
import { stepsMonde2 } from './mondes/stepsMonde2';
import { stepsMonde3 } from './mondes/stepsMonde3';
import { appLinks } from './appLinks';
import AnimationFirst from './animations/AnimationFirst';
import AnimationSecond from './animations/AnimationSecond';
import { Link } from 'react-router-dom';

type ComplicatedFormProps = {
    onValider?: ValiderFunction;
};

type Monde = 'Monde1' | 'Monde2' | 'Monde3';

export const ComplicatedForm = ({ onValider }: ComplicatedFormProps) => {
    const [selectedMonde, setSelectedMonde] = useState<Monde | null>(null);
    const [currentStepId, setCurrentStepId] = useState<string | null>(null);

    const [boomCounter, setBoomCounter] = useState<number>(0);

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
        setCurrentStepId(steps[0].id); // première étape
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

        // Gestion liens vers site externe
        if (choice.nextStep.startsWith('LINK-')) {
            const appName = choice.nextStep.replace('LINK-', '');
            const url = appLinks[appName];
            if (url) window.open(url, '_blank');
            return;
        }

        // Gestion retour au choix du monde
        if (choice.nextStep === 'RESET') {
            setSelectedMonde(null);
            setCurrentStepId(null);
            return;
        }

        if (onValider) onValider(currentStepId, choice.label);
        if (choice.nextStep) setCurrentStepId(choice.nextStep);
    };

    if (!selectedMonde) {
        return (
            <div className="monde-selection">
                <h2>Choisissez votre monde :</h2>
                <button onClick={() => handleMondeSelect('Monde1')}>Monde 1 : Archipel des Formes</button>
                <button onClick={() => handleMondeSelect('Monde2')}>Monde 2 : Studio Dynamique</button>
                <button onClick={() => handleMondeSelect('Monde3')}>Monde 3 : Cité Logique</button>
            </div>
        );
    }

    const steps = getSteps();
    const currentStep = steps.find((s) => s.id === currentStepId);
    if (!currentStep) return <div>Étape inconnue...</div>;

    return (
        <div className="adaptive-form">
            {currentStepId != null && currentStep.choices.length == 3 ?
                (Math.random() < 0.5 ? 
                    <AnimationSecond key={currentStepId} question={currentStep.question} choices={currentStep.choices} handle_choice={handleChoice}></AnimationSecond> : 
                    <AnimationFirst key={currentStepId} question={currentStep.question} choices={currentStep.choices} handle_choice={handleChoice}></AnimationFirst>
                ) :
                <>
                    <h2 onClick={() => currentStep.id === 'BOOM' ? setBoomCounter(boomCounter + 1) : console.log("ok")}>{currentStep.question}</h2>
                    {boomCounter > 5 ? <Link to="/snake">Secret</Link> : null}
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
                </>
            }
        </div>
    );
};
