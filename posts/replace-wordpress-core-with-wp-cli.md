---
title: Replace WordPress core with WP CLI
date: 2022-03-09
---

One of the main reasons we often have to replace the WordPress core files is if the site becomes compromised and the malware modifies the core files, causing the dashboard to become inaccessible. In these cases, replacing the core can restore access and help secure the site.

⚠️ **Make sure to take a backup before the cleanup.**

### Re-install

The first step will be to check if the core files are intact.

```bash
wp core verify-checksums
```

````

If core files are intact, the command will return a response `Success: WordPress installation verifies against checksums.`

Otherwise, we should re-install the core files.

```bash
wp core download --force --skip-content
```

If the installed WordPress version is 6.0 but the latest version is 6.1, the above command will replace the core files with the latest WordPress version. Also, the `--skip-content` is used to avoid downloading default WP themes and plugins.

Though it’s recommended to use the latest WordPress version, sometimes you may not want to update the WordPress version to the latest for X reason. That’s when we need to specify the `--version` flag.

```bash
# get the currently installed version of WordPress
wp core version
# the output will be a number e.g. 6.0
# to re-install the same version
wp core download --force --skip-content --version=6.0
```
# to do it in one line
wp core download --force --skip-content --version=$(wp core version)
```

💡 WP CLI can’t always clean up the leftover files. In such cases, check the core version first, delete the `wp-admin` and `wp-includes` folders and reinstall the core.


````
