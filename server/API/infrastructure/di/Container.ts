import { Container } from 'inversify';
import { AllInstaller } from './AllInstaller';

const container = new Container();
const allInstaller = new AllInstaller(container);
allInstaller.install();

export { container };
