export interface Def {
  value: string;
  masked: string;
  unmasked: string;
}

export class InputDef implements Def {
  constructor(public value: string) {
    this.value = value;
  }

  public get masked(): string {
    return this.value;
  }

  public get unmasked(): string {
    return this.value;
  }
}

export class FixedDef implements Def {
  constructor(public value: string) {
    this.value = value;
  }

  public get masked(): string {
    return this.value;
  }

  public get unmasked(): string {
    return '';
  }
}
