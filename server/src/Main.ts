

export class Core {
  private static debug:boolean = false;

  private static crashed:boolean = false;
  private static closing:boolean = false;

  private static globalUpdateRange:number = 18;
  private static globalMaxUpdateRange:number = 24;


  public static Start():void {

  }

  public static Stop(restart:boolean = false):void {
    if (this.closing) {
      return;
    }

    this.closing = true;

    // World.WaitForWriteCompletion();

    // if (!crashed) {
    //     EventSink.InvokeShutdown(new ShutdownEventArgs());
    // }

    // Timer.TimerThread.Set();

    console.log("Exiting...");

    if (restart) {
      // Process.Start(ExePath, Arguments);
    }

    console.log("done");

    // m_Process.Kill();
  }
}