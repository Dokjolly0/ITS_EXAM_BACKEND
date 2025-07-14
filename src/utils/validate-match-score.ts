import { BadRequestError } from "../errors/bad-request-error";

export function validateMatchScore(score1: number, score2: number): void {
  if (score1 < 0 || score2 < 0) {
    throw new BadRequestError("I punteggi devono essere >= 0");
  }

  if (score1 === score2) {
    throw new BadRequestError("Una partita non può finire in pareggio");
  }

  const maxScore = Math.max(score1, score2);
  const minScore = Math.min(score1, score2);
  const diff = Math.abs(score1 - score2);

  // Caso 1: punteggio NON arriva a 10-10
  if (maxScore < 11) {
    throw new BadRequestError("Il vincitore deve raggiungere almeno 11 punti");
  }

  // Caso 2: punteggio sopra 11 ma NON necessario
  if (maxScore > 11 && minScore < 10) {
    throw new BadRequestError(
      "Punteggio non valido: il vincitore ha superato 11 senza che l'avversario abbia raggiunto 10"
    );
  }

  // Caso 3: ai vantaggi (dopo 10-10), ci vuole almeno 2 di scarto
  if (maxScore >= 11 && minScore >= 10 && diff < 2) {
    throw new BadRequestError("Ai vantaggi serve almeno 2 punti di differenza");
  }
}
