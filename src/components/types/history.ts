import { Operations } from "@/types/buttons"

export interface HistoryItem {
	leftOperand: number
	operation: Operations
	rightOperand: number
}

export type HistoryList = HistoryItem[]
