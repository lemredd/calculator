import { HistoryItem } from "@/types/history"

import helper from "./joinHistoryItemParts"

describe("Component helper: joinHistoryItemParts", () => {
	it("should join history item parts into a string", () => {
		const historyItem = {
			"leftOperand": 1,
			"operation": "+",
			"rightOperand": 1
		} as HistoryItem

		const expectedReturnValue = `${historyItem.leftOperand} ${historyItem.operation} ${historyItem.rightOperand}`
		expect(helper(historyItem)).toEqual(expectedReturnValue)
	})
})
