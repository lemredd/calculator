/// <reference types="vitest/config" />
import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

const ROOT_DIR = __dirname

// https://vitejs.dev/config/

export default defineConfig({
	"plugins": [vue()],
	"resolve": {
		"alias": {
			"@": path.resolve(ROOT_DIR, "./src/components"),
			"^t": path.resolve(ROOT_DIR, "./test")
		}
	},
	"server": {
		"open": true
	},
	"test": {
		"environment": "jsdom",
		"globals": true
	}
})
