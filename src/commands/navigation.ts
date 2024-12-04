import { getCheckedSwitches } from '../switches';
import { getCurrentRailsFile } from '../rails-file';
import { showPicker } from './util';
import * as vscode from 'vscode';

export async function navigateRails() {
  try {
    const railsFile = getCurrentRailsFile();
    if (!railsFile) {
      return;
    }
    vscode.window.showInformationMessage("a:" +railsFile.basename)
    const switchableFiles = await getCheckedSwitches(railsFile);
    return await showPicker(railsFile.railsRoot, switchableFiles);
  } catch (err) {
    console.error(err);
  }
}
