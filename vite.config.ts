import vue from "@vitejs/plugin-vue"
import path from "path"

import { defineConfig } from "vite"

const ROOT_DIR = __dirname

// https://vitejs.dev/config/
export default defineConfig({
	"plugins": [vue()],
	"resolve": {
		"alias": {
			"@": path.resolve(ROOT_DIR, "./src/components")
		}
	},
	"server": {
		"open": true
	}
})
