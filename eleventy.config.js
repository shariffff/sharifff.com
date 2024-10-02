const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPassthroughCopy("main.css");

	eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
    });
    eleventyConfig.addFilter("htmlDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toISODate();
    });

  };
