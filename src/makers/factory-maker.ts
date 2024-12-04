import { SwitchFile } from '../types';
import { RailsFile } from '../rails-file';
import { RailsWorkspace } from '../rails-workspace';
import * as path from 'path';

export function factoryMaker(
  railsFile: RailsFile,
  workspace: RailsWorkspace
): SwitchFile[] {
  return railsFile.possibleModelNames().map(modelName => {
    const basename = path.join(railsFile.module, "factory_" + modelName + ".rb")
    return {
      filename: path.join(workspace.factoryPath, basename),
      title: 'Factory ' + basename,
      type: 'factory',
    };
  });
}
