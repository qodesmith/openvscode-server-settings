import * as vscode from 'vscode'

export async function activate(context: vscode.ExtensionContext) {
  const globalStateKey = 'open-vscodeserver-initial-settings.hasLoaded'
  const hasLoaded = context.globalState.get(globalStateKey)

  /**
   * To avoid overwriting the settings each time VS Code is opened, we use
   * globalState to store a boolean so we can skip the process. Data inside
   * `context.globalState` persists across VS Code sessions.
   */
  if (hasLoaded === true) return

  /**
   * This plugin expects to find a `settings.json` file in the
   * `/vscode-settings` directory. Those values will then programmatically set
   * on the VS Code configuration.
   *
   * open-vscodeserver doesn't store settings in a file, rather, it persists
   * them in the browser's indexedDB.
   */
  const fileUri = vscode.Uri.file('/vscode-settings/settings.json')
  const fileBytes = await vscode.workspace.fs.readFile(fileUri)
  const fileContent = fileBytes.toString()
  const settings: Record<string, any> = JSON.parse(fileContent)

  vscode.window.showInformationMessage('Updating initial settings...')
  Object.entries(settings).forEach(([key, value]) => {
    vscode.workspace
      .getConfiguration()
      .update(key, value, vscode.ConfigurationTarget.Global)
  })

  context.globalState.update(globalStateKey, true)
  vscode.window.showInformationMessage('Settings updated!')
}

export function deactivate() {}
