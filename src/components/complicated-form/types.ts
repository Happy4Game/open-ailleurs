export type Choice = {
    label: string;
    nextStep: string;
};

export type Step = {
    id: string;
    question: string;
    choices: Choice[];
    type?: 'final';
};

export type ValiderFunction = (stepId: string, choice: string) => void;
