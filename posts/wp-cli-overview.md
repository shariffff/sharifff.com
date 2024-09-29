---
title: WP CLI – Overview
date: 2022-01-19
---

WP CLI enables the management of WordPress admin actions through the command line. This tool is particularly useful for performing actions that are typically done from the admin area, especially those that are more complex.

## Installing WP CLI

WP CLI might already be installed if you are using a managed hosting service. To check if WP CLI is installed, run the following command in your terminal:

```bash

wp --info

```

If WP CLI is installed, this command will output the WP CLI version at the end. For detailed instructions on how to install WP CLI on various platforms, refer to [The Complete Guide to Installing WP-CLI](#).

## Download or Reinstall the WP Core

To download the latest WordPress core, use:

```bash

wp core download

```

Options include:

- `--force`: Overrides the existing installation. Use this if you're reinstalling and WP is already in the target directory.
- `--skip-content`: Skips downloading the `wp-content` folder, thus excluding default themes and plugins.
- `--version`: Specifies the version of WordPress to install. If not set, the latest version is installed.

### Reinstalling WordPress Core Files

1. Verify core files with `wp core verify-checksums`.
2. Check the currently installed version with `wp core version` to avoid accidental updates.
3. Ensure you're in the root directory (e.g., `public_html`).
4. Download the core using:

```bash

wp core download --skip-content --force --version=[NUMBER]

```

## Install Plugins and Themes

To install a plugin or theme:

```bash

wp plugin install woocommerce
wp theme install astra

```

### Delete a Plugin or Theme

```bash

wp plugin delete woocommerce
wp theme delete astra

```

### Deactivate a Plugin or Theme

```bash

wp plugin deactivate woocommerce
wp theme deactivate astra

```

Additional options for installation:

- `--force`: Reinstalls the plugin or theme.
- `--skip-plugins` and `--skip-themes`: Skips initialization of plugins and themes to prevent fatal errors.
- `--activate`: Activates the plugin or theme after installation.
- `--version`: Specifies the version to install.

Example for reinstalling a plugin or theme:

```bash

wp plugin install woocommerce --force --skip-plugins --skip-themes
wp theme install astra --force --skip-plugins --skip-themes

```

## Reset User Password

If the reset password email fails to send, you can change a user's password with WP CLI:

```bash

wp user update 123 --user-pass=newpass

```

- `123` is the user ID, but you can also use the user's email or username.
- To list users, use `wp user list`.
