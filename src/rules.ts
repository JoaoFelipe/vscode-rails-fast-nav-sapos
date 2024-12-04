import { RailsFile } from './rails-file';
import { RailsWorkspace } from './rails-workspace';
import { SwitchFile, SwitchMaker, SwitchMatcher, SwitchRule } from './types';
import {
  controllerMaker,
  modelMaker,
  viewMaker,
  specMaker,
  factoryMaker,
  testMaker,
  inverseTestMaker,
  fixtureMaker,
} from './makers';

function switchRule(matcher: SwitchMatcher, maker: SwitchMaker): SwitchRule {
  return async function(railsFile: RailsFile, workspace: RailsWorkspace) {
    if (await matcher(railsFile, workspace)) {
      const files = await maker(railsFile, workspace);
      if (Array.isArray(files)) {
        return files;
      } else {
        return [files];
      }
    } else {
      return [];
    }
  };
}

export function genericMaker(
  railsFile: RailsFile,
  workspace: RailsWorkspace
): SwitchFile[] {
  return railsFile.relatedFiles(workspace)
}

export const rules = [
  switchRule((f, w) => true, genericMaker),
  switchRule((f, w) => w.hasSpecs(), specMaker),
  switchRule((f, w) => w.hasFactories(), factoryMaker),
  switchRule((f, w) => w.hasTests(), testMaker),
  switchRule((f, w) => f.isTest(), inverseTestMaker),
  switchRule(f => !f.isModel(), modelMaker),
  switchRule(f => f.isController(), viewMaker),
  switchRule(f => f.isModel() || f.isView(), controllerMaker),
  switchRule(f => !f.isFixture(), fixtureMaker),
];
