import { SwitchFile } from '../types';
import { RailsFile } from '../rails-file';
import { RailsWorkspace } from '../rails-workspace';

export function inverseFactoryMaker(
  railsFile: RailsFile,
  workspace: RailsWorkspace
): SwitchFile[] {

  return railsFile.relatedFiles(workspace)
}
