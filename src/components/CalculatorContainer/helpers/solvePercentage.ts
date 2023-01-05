import evaluate from "@/CalculatorContainer/helpers/evaluate"

export default function(base: number, percent: number) {
	const percentInDecimal = percent / 100
	const percentageResult = evaluate(`${base} * ${percentInDecimal}`)
	return percentageResult
}
