import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://sharifff.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
		  theme: 'aurora-x',
		//   themes: {
		// 	light: 'github-light',
		// 	dark: 'github-dark',
		//   },
		  defaultColor: false,
		  langs: [],
		  wrap: true,
		  transformers: [],
		},
	  },
});
