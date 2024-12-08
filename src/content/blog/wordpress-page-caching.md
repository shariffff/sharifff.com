---
title: Deep Drive to WordPress Page Caching
description: ''
pubDate: 2024-12-07
---

We all use page caching on WordPress through plugins to make pages load faster. In this post, I'll explain how it works under the hood and show you how to create a minimal page caching plugin of your own.

### Manual Process

Let’s start with the `hello-world` post that ships by default with WordPress. Make sure the permalink structure is set to **Post Name** so we can access the post by visiting `domain.com/hello-world`. Visit the page and copy its content from the browser’s Page Source using `Ctrl+U` (Windows) or `⌘-Option-U` (Mac).

In the root folder where the WordPress core files reside (typically `public_html`, `htdocs`, or `www`), create a `hello-world` folder and place an `index.html` file inside it.

```bash
wp-admin
wp-content
wp-includes
hello-world
 └─ index.html
```

Now, paste the copied content into the `index.html` file. If you revisit `/hello-world`, it will be loaded from the `index.html` file instead of WordPress. To verify this, you can delete the `hello-world` post from WordPress.

### How It Works

`index` is the entry point for most web applications, and servers are configured accordingly. For example, here’s a default Nginx configuration file:

```nginx
server {
    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

These rules instruct the server to look for the exact file. If the file is not found, it adds a slash to check for a directory. If a directory is found, it looks for an `index` file such as `index.html`.

When we load the `hello-world` folder, the server automatically serves the `index.html` file. This is also how most static site generators work.

### WordPress

When we request a page from WordPress, it processes the request, performs database queries, and generates an HTML response for the browser.

However, WordPress allows us to bypass this heavy lifting by using page caching. If the content is static (the same for all users), there’s no need to regenerate it on every request.

In the WordPress core, caching functionality is integrated via the `wp-settings.php` file:

```php
if ( WP_CACHE && apply_filters( 'enable_loading_advanced_cache_dropin', true ) && file_exists( WP_CONTENT_DIR . '/advanced-cache.php' ) ) {
    // For an advanced caching plugin to use.
    include WP_CONTENT_DIR . '/advanced-cache.php';

    // Reinitialize any hooks added by advanced-cache.php.
    if ( $wp_filter ) {
        $wp_filter = WP_Hook::build_preinitialized_hooks( $wp_filter );
    }
}
```

Breaking this down, WordPress allows us to load custom caching logic via `advanced-cache.php` if:

1. `WP_CACHE` is set to `true`.
2. The `enable_loading_advanced_cache_dropin` filter returns `true` (default behavior).
3. A file named `advanced-cache.php` exists in the `wp-content` directory.

Let’s add the caching constant to `wp-config.php` and create an `advanced-cache.php` file inside `wp-content`:

```php
define( 'WP_CACHE', true );
```

### Create the Cache and Serve

First, create a folder for cached files, which we’ll call `mini-cache`. For example, if a user visits `/about`, we’ll save the page as `about.html` in the cache folder. On subsequent visits, the cached file will be served, bypassing WordPress execution.

Here’s how the `advanced-cache.php` file will look:

```php
<?php

// Exit if it's a CRON event.
if ( defined( 'DOING_CRON' ) && DOING_CRON ) {
    return;
}

// Create the "mini-cache" folder if it doesn't exist.
$cache_folder = WP_CONTENT_DIR . '/mini-cache/';
if ( ! is_dir( $cache_folder ) && ! mkdir( $cache_folder, 0755, true ) ) {
    error_log( 'Failed to create cache directory: ' . $cache_folder );
    return;
}

add_action( 'template_redirect', function () use ( $cache_folder ) {

    // Exit early for admin requests or non-GET requests.
    if ( is_admin() || 'GET' !== $_SERVER['REQUEST_METHOD'] ) {
        return;
    }

    // Hash the file name for compatibility.
    // It may contain ?, & or / which is not valid in file paths.
    $cache_file = $cache_folder . md5( $_SERVER['REQUEST_URI'] ) . '.html';

    // Serve the cached file if it exists.
    if ( file_exists( $cache_file ) ) {
        echo file_get_contents( $cache_file ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo '<!-- Served from mini-cache -->';
        exit;
    }

    // Create the cache file.
    ob_start(
        function ( $buffer ) use ( $cache_file ) {
            if ( false === file_put_contents( $cache_file, $buffer ) ) {
                error_log( 'Failed to write cache file: ' . $cache_file );
            }
            return $buffer;
        }
    );
});

```

### Verification

To verify that caching works:

1. Visit a page twice. On the first visit, no cache will exist.
2. On the second visit, after the cache is created, you should see `<!-- Served from mini-cache -->` in the page source.
3. Check the `mini-cache` folder to confirm the cached files are saved.

### What’s Next?

This example demonstrates how page caching works under the hood. Real-world caching plugins handle additional complexities such as cache invalidation, clearing all caches, and advanced file handling. To learn more, explore the code of caching plugins like [Surge](https://github.com/kovshenin/surge/tree/main).
