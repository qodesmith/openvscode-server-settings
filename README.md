# openvscode-server-settings

[openvscode-server](https://github.com/gitpod-io/openvscode-server) persists
settings in the browser's indexedDB rather than a `settings.json` file on the
file system. This makes it difficult to start VS Code with initial settings.
This plugin solves that issue by dynamically updating VS Code's configuration
at startup.

## How to use

Add a `settings.json` file to a `/vscode-settings` directory on your host
machine and this plugin will read it and add its contents to VS Code's settings
when it starts up. All settings have to be valid (i.e. no arbitrary values).

If you have settings for other plugins (such as eslint, prettier, etc.), make
sure to _install those plugins first_ in your Dockerfile.
