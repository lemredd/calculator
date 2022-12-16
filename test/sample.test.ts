import { shallowMount } from "@vue/test-utils"

import SampleComponent from "./SampleComponent.vue"

describe("Sample test", () => {
	it("should test successfully", () => {
		expect(1).toEqual(1)
	})

	it("must have inner text", () => {
		const wrapper = shallowMount(SampleComponent)

		expect(wrapper.text()).toEqual("Sample")
	})
})
