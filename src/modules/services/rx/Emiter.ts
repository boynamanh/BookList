class Observer {
  action: string;
  handler: (message?: any) => void;
  constructor(action: string, handler: (message?: any) => void) {
    this.action = action;
    this.handler = handler;
  }
}

class EmitCenter {
  private static instance: EmitCenter;
  private observes: Observer[] = [];

  static share(): EmitCenter {
    if (!EmitCenter.instance) {
      EmitCenter.instance = new EmitCenter();
    }
    return EmitCenter.instance;
  }

  public addObserve(
    action: string,
    handler: (message?: any) => void,
  ): Observer {
    const observer = new Observer(action, handler);
    this.observes.push(observer);
    return observer;
  }

  public remove(observer: Observer): void {
    this.observes = this.observes.filter(item => item !== observer);
  }

  public push(action: string, message?: any) {
    const observers = this.observes.filter(item => item.action === action);
    observers.forEach(observer => {
      observer.handler(message);
    });
  }
}

export default EmitCenter;
