import { DateTime } from "luxon";
import MarkdownIt from "markdown-it";
import Shiki from "@shikijs/markdown-it";

let markdownLib = MarkdownIt()
	.use(
		await Shiki({
			theme: "aurora-x",
		}),
	);
	export default async function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("main.css");
	eleventyConfig.setLibrary("md", markdownLib);

	eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
    });
    eleventyConfig.addFilter("htmlDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toISODate();
    });

  };
