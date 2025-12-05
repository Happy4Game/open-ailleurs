// src/components/PortalIntention.tsx
import React, { useMemo, useState } from 'react';

type Mission = 'contact' | 'don' | 'benevolat' | 'info';

type FormState = {
    mission: Mission | '';
    name: string;
    email: string;
    message: string;
    // donation specific
    amount?: string;
    recurrence?: 'one-time' | 'monthly' | 'yearly' | '';
    // honeypot / anti-spam
    honey?: string;
};

type SubmitResult =
    | { status: 'idle' }
    | { status: 'sending' }
    | { status: 'success'; serverMessage?: string }
    | { status: 'error'; error: string };

const CURRENT_YEAR = new Date().getFullYear();
const ANNUAL_PROJECT = 'Rénovation du Noyau Communautaire'; // exemple, modifiable via props later

// Simple validators
const emailValid = (s: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

const amountValid = (s: string) => {
    if (!s) return false;
    const n = Number(s.replace(',', '.'));
    return !Number.isNaN(n) && n > 0;
};

// Anti-spam: minimal rate-limit using localStorage (client-side only)
const canSubmitNow = (rateLimitSeconds = 30) => {
    try {
        const last = localStorage.getItem('portal_last_submit_ts');
        if (!last) return true;
        const then = Number(last);
        return Date.now() - then > rateLimitSeconds * 1000;
    } catch {
        return true;
    }
};
const markSubmittedNow = () => {

    localStorage.setItem('portal_last_submit_ts', String(Date.now()));

};

// Simulated "encrypted send" helper (placeholder).
// WARNING: This is only illustrative. Real encryption requires proper key management and a backend.
async function sendEncrypted(payload: object): Promise<{ ok: boolean; message?: string }> {
    // Example: stringify and base64 encode as "pseudo-encryption"
    const text = JSON.stringify(payload);
    const pseudoEncrypted = btoa(unescape(encodeURIComponent(text)));
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));
    // In real app: use fetch('/api/submit', { method:'POST', body: encryptedBlob })
    // Here we'll just resolve success:
    console.debug('Pseudo-encrypted payload sent:', pseudoEncrypted.slice(0, 64) + '...');
    return { ok: true, message: 'Reçu (simulation).' };
}

export const PortalIntention: React.FC = () => {
    const [state, setState] = useState<FormState>({
        mission: '',
        name: '',
        email: '',
        message: '',
        amount: '',
        recurrence: '',
        honey: '',
    });

    const [result, setResult] = useState<SubmitResult>({ status: 'idle' });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // derived: which fields to show
    const fields = useMemo(() => {
        switch (state.mission) {
            case 'don':
                return ['name', 'email', 'amount', 'recurrence', 'message'];
            case 'contact':
                return ['name', 'email', 'message'];
            case 'benevolat':
                return ['name', 'email', 'message'];
            case 'info':
                return ['email', 'message'];
            default:
                return [];
        }
    }, [state.mission]);

    const validate = (): boolean => {
        const e: Record<string, string> = {};
        if (!state.mission) {
            e.mission = 'Choisissez une mission.';
        }
        if (fields.includes('email')) {
            if (!state.email || !emailValid(state.email)) {
                e.email = 'Email invalide.';
            }
        }
        if (fields.includes('name')) {
            if (!state.name.trim()) e.name = 'Nom requis.';
        }
        if (state.mission === 'don') {
            if (!state.amount || !amountValid(state.amount)) {
                e.amount = 'Montant invalide.';
            }
        }
        // honeypot should be empty
        if (state.honey && state.honey.trim().length > 0) {
            e.honey = 'Spam détecté.';
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const resetToRoot = () => {
        setState({
            mission: '',
            name: '',
            email: '',
            message: '',
            amount: '',
            recurrence: '',
            honey: '',
        });
        setResult({ status: 'idle' });
        setErrors({});
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        // Client-side rate limit
        if (!canSubmitNow(15)) {
            setResult({ status: 'error', error: 'Veuillez attendre avant de renvoyer (protection anti-spam).' });
            return;
        }

        if (!validate()) {
            setResult({ status: 'error', error: 'Validation échouée.' });
            return;
        }

        // honeypot check
        if (state.honey && state.honey.trim().length > 0) {
            setResult({ status: 'error', error: 'Spam détecté.' });
            return;
        }

        setResult({ status: 'sending' });

        // Build payload
        const payload = {
            mission: state.mission,
            name: state.name.trim(),
            email: state.email.trim(),
            message: state.message.trim(),
            amount: state.amount ? state.amount.trim() : undefined,
            recurrence: state.recurrence || undefined,
            timestamp: new Date().toISOString(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
        };

        const resp = await sendEncrypted(payload);
        if (resp.ok) {
            markSubmittedNow();
            setResult({ status: 'success', serverMessage: resp.message });
        } else {
            setResult({ status: 'error', error: resp.message || 'Erreur serveur.' });
        }

    };

    // Small UI helpers
    const onChange =
        (k: keyof FormState) =>
            (v: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                setState((s) => ({ ...s, [k]: v.target.value }));
            };

    // Confirmation texts
    const greeting = (name?: string, mission?: Mission) => {
        const displayName = name && name.trim().length > 0 ? name.trim() : 'Ami·e';
        switch (mission) {
            case 'don':
                return `Un immense "GG", ${displayName} ! 🏆 Ton don est une bénédiction — merci !`;
            case 'benevolat':
                return `Salutations, ${displayName} ! 👋 Merci de vouloir rejoindre la Guilde des Bénévoles.`;
            case 'contact':
                return `Salutations, ${displayName} ! 👋 Ton message a bien été acheminé - nos agents répondront sous peu.`;
            case 'info':
                return `Merci, ${displayName} ! ❓ Ta demande d'information a bien été reçue.`;
            default:
                return `Merci, ${displayName} !`;
        }
    };

    // Simple responsive layout classNames placeholders (user provides CSS)
    return (
        <div className="portal-container" style={{ maxWidth: 760, margin: '0 auto', padding: 16 }}>
            <header>
                <h1>Portail d'Intention</h1>
                <p style={{ opacity: 0.8 }}>
                    Choisis ta mission — le formulaire s'adapte. (Année : <strong>{CURRENT_YEAR}</strong>)
                </p>
            </header>

            {/* If succeeded show confirmation zone */}
            {result.status === 'success' ? (
                <section className="confirmation" style={{ marginTop: 20, padding: 16, borderRadius: 8, background: '#f6ffed', color: 'black' }}>
                    <h2>{greeting(state.name, state.mission as Mission)}</h2>
                    <p>
                        {state.mission === 'don' ? (
                            <>
                                Ton soutien en <strong>{CURRENT_YEAR}</strong> est crucial pour notre progression ! Grâce à toi, nous
                                pouvons avancer sur le projet <strong>{ANNUAL_PROJECT}</strong> cette année.
                            </>
                        ) : (
                            <>
                                Reste connecté pour suivre nos exploits tout au long de l'année <strong>{CURRENT_YEAR}</strong> !
                            </>
                        )}
                    </p>
                    <p style={{ fontStyle: 'italic', color: '#000' }}>{result.serverMessage || 'Merci pour ta contribution.'}</p>
                    <div style={{ marginTop: 12 }}>
                        <button onClick={resetToRoot}>Retour au portail</button>
                    </div>
                </section>
            ) : (
                // Form
                <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
                    <fieldset style={{ border: 0, padding: 0 }}>
                        <legend style={{ fontWeight: 700 }}>Sélection de la Voie 🛣️</legend>
                        <div role="radiogroup" aria-label="Missions" style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                            <label>
                                <input
                                    type="radio"
                                    name="mission"
                                    value="contact"
                                    checked={state.mission === 'contact'}
                                    onChange={() => setState((s) => ({ ...s, mission: 'contact' }))}
                                />{' '}
                                Établir le Contact 📞
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="mission"
                                    value="don"
                                    checked={state.mission === 'don'}
                                    onChange={() => setState((s) => ({ ...s, mission: 'don' }))}
                                />{' '}
                                Offrir un Don 💰
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="mission"
                                    value="benevolat"
                                    checked={state.mission === 'benevolat'}
                                    onChange={() => setState((s) => ({ ...s, mission: 'benevolat' }))}
                                />{' '}
                                Rejoindre la Guilde 🛡️
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="mission"
                                    value="info"
                                    checked={state.mission === 'info'}
                                    onChange={() => setState((s) => ({ ...s, mission: 'info' }))}
                                />{' '}
                                Demander des Informations ❓
                            </label>
                        </div>
                        {errors.mission && <div className="error">{errors.mission}</div>}
                    </fieldset>

                    {/* Dynamic fields */}
                    <div style={{ marginTop: 12 }}>
                        {fields.includes('name') && (
                            <div style={{ marginBottom: 8 }}>
                                <label>
                                    Nom
                                    <input value={state.name} onChange={onChange('name')} placeholder="Ton nom" />
                                </label>
                                {errors.name && <div className="error">{errors.name}</div>}
                            </div>
                        )}

                        {fields.includes('email') && (
                            <div style={{ marginBottom: 8 }}>
                                <label>
                                    Email
                                    <input value={state.email} onChange={onChange('email')} placeholder="email@exemple.tld" />
                                </label>
                                {errors.email && <div className="error">{errors.email}</div>}
                            </div>
                        )}

                        {state.mission === 'don' && (
                            <div style={{ marginBottom: 8 }}>
                                <label>
                                    Montant (EUR)
                                    <input value={state.amount} onChange={onChange('amount')} placeholder="ex: 10.00" />
                                </label>
                                {errors.amount && <div className="error">{errors.amount}</div>}

                                <div style={{ marginTop: 6 }}>
                                    <label>
                                        Récurrence
                                        <select value={state.recurrence} onChange={onChange('recurrence')}>
                                            <option value="">--</option>
                                            <option value="one-time">Ponctuel</option>
                                            <option value="monthly">Mensuel</option>
                                            <option value="yearly">Annuel</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        )}

                        {fields.includes('message') && (
                            <div style={{ marginBottom: 8 }}>
                                <label>
                                    Message
                                    <textarea value={state.message} onChange={onChange('message')} placeholder="Ton message..." />
                                </label>
                            </div>
                        )}

                        {/* Honeypot - invisible to users but effective against naive bots */}
                        <div style={{ position: 'absolute', left: -9999, top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
                            <label>
                                Laisser ce champ vide
                                <input value={state.honey} onChange={onChange('honey')} tabIndex={-1} autoComplete="off" />
                            </label>
                        </div>
                    </div>

                    {/* Errors summary */}
                    {result.status === 'error' && <div style={{ color: 'crimson', marginTop: 8 }}>{result.error}</div>}

                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        <button type="submit" disabled={result.status === 'sending'}>
                            {result.status === 'sending' ? 'Envoi...' : 'Envoyer la mission'}
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setState((s) => ({
                                    ...s,
                                    message: '',
                                    amount: '',
                                    recurrence: '',
                                }))
                            }
                        >
                            Effacer
                        </button>
                        <button type="button" onClick={resetToRoot}>
                            Annuler
                        </button>
                    </div>
                </form>
            )}
            <footer style={{ marginTop: 18, opacity: 0.8 }}>
                <small>
                    Sécurité : validation côté client + protections anti-spam frugales (honeypot + rate-limit local). Pour une
                    production sérieuse, implémente TLS, vérification côté serveur, enregistrement sécurisé des logs et un système
                    anti-spam/anti-bot robuste (reCAPTCHA, hCaptcha, double opt-in...).{' '}
                </small>
            </footer>
        </div>
    );
};

export default PortalIntention;
