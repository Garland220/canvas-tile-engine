

export class HardwareInfo {
  private cpuCores: number = 0; // navigator.hardwareConcurrency
  private memory: number = 0; // window.performance.memory.jsHeapSizeLimit (bytes)
  private os: string = ''; // window.navigator.platform || windows.navigator.oscpu
  private userAgent: string = ''; // window.navigator.userAgent
  private language: string = '';

  public get CPUCores(): number {
    return this.cpuCores;
  }

  public get Memory(): number {
    return this.memory;
  }

  public get OS(): string {
    return this.os;
  }

  public get UserAgent(): string {
    return this.userAgent;
  }

  constructor(cores: number, memory: number, os: string, userAgent: string) {
    this.cpuCores = cores;
    this.memory = memory;
    this.os = os;
    this.userAgent = userAgent;
  }
}
