import { defineConfig } from "vite"

export default defineConfig({
	server: {
		cors: {
			origin: ['https://danielkvg.com', 'http://localhost:3000'],
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type']
		},
		allowedHosts: ['danielkvg.com']
	}
});