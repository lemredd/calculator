import { HistoryItem } from "@/types/history"

export default function(historyItem: HistoryItem) {
	return `${historyItem.leftOperand} ${historyItem.operation} ${ historyItem.rightOperand}`
}
