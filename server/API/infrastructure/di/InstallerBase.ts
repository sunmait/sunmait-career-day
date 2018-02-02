import { Container } from 'inversify';

export abstract class InstallerBase {
  protected container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  public abstract install(): void;
}
