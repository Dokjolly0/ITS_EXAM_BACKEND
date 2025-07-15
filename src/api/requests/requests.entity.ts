import { RequestStateType } from "../../utils/types/requests.type";

export interface Request {
  id: string; // requestId (PK)
  requestDate: Date | string; // requestDate
  categoryId: string; // categoryId (FK)
  object: string; // object (Descrizione del bene)
  quantity: number; // quantity
  price: number; // price
  motivation: string; // motivation
  state: RequestStateType; // state
  userId: string; // userId (FK - Utente richiedente)
  validationDate?: Date | string; // validationDate
  approvedBy?: string; // approvedBy (FK - Utente che ha approvato
  rejectedBy?: string; // rejectedBy (FK - Utente che ha rifiutato)
}
